/**
 * Runs the on-page SEO check for `seo:onpage` and `seo:qa` (SEO-39, ported from kreatli.com's KRE-77 check).
 * Read-only: fetches pages, reports findings. Runs under tsx, so it can import the TypeScript registry and libs.
 */
import fs from 'node:fs';
import path from 'node:path';

import { APP_PAGE_TARGETS } from '../../src/content/seo/appPages.ts';
import { getPageUrl } from '../../src/content/seo/paths.ts';
import { SEO_PAGES } from '../../src/content/seo/registry.ts';
import { dateWindow, querySearchAnalytics, urlPath } from '../lib/gsc.ts';
import { loadRedirects } from '../lib/redirects.ts';
import { auditDuplicates, auditGsc, auditLinks, auditPage, pathOf, toPageTargets } from './checks.mjs';
import { extractPage } from './page.mjs';
import { matchSpecificity } from './text.mjs';

const ROOT = process.cwd();
export const BASELINE_FILE = path.join(ROOT, 'scripts/onpage/onpage-baseline.json');
export const PRODUCTION = 'https://marketplace.kreatli.com';
export const LOCAL = 'http://localhost:3000';
const HOLD_DAYS = 28;
const REQUEST_TIMEOUT_MS = 30_000;

// Compare and alternatives pages quote prices and competitor facts, so they should show when facts were checked.
const BUYER_TYPES = new Set(['compare', 'alternatives']);

/** Every registry page with `targets`, plus the app pages with targets, keyed by path, in the shape the rules read. */
export const loadTargets = async () =>
  new Map([
    ...SEO_PAGES.filter((page) => page.targets).map((page) => {
      const pagePath = getPageUrl(page.type, page.slug);
      const kind = BUYER_TYPES.has(page.type) ? 'buyer' : 'content';
      return [pagePath, { ...toPageTargets(pagePath, { ...page.targets, kind }), page }];
    }),
    ...Object.entries(APP_PAGE_TARGETS).map(([pagePath, targets]) => [
      pagePath,
      { ...toPageTargets(pagePath, { ...targets, kind: 'content' }), page: null },
    ]),
  ]);

export const readBaseline = (file = BASELINE_FILE) => {
  try {
    return new Set(JSON.parse(fs.readFileSync(file, 'utf8')).keys);
  } catch {
    return new Set();
  }
};

export const writeBaseline = (findings, base, file = BASELINE_FILE) => {
  const keys = Array.from(
    new Set(findings.filter((f) => f.severity !== 'info' && !f.excepted && f.rule !== 'fetch').map((f) => f.key)),
  ).sort();
  const note =
    'Known on-page findings (SEO-39). Only must-fix findings not listed here fail the gate. Never add keys to pass the gate; regenerate on production with npm run seo:onpage -- --gsc --links --update-baseline.';
  fs.writeFileSync(file, `${JSON.stringify({ note, generatedAt: new Date().toISOString(), base, keys }, null, 2)}\n`);
  return keys.length;
};

export const fetchPage = async (base, pagePath) => {
  for (let attempt = 1; ; attempt += 1) {
    try {
      const response = await fetch(`${base}${pagePath}`, {
        redirect: 'follow',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      const finalPath = new URL(response.url).pathname.replace(/\/$/, '') || '/';
      return { status: response.status, finalPath, html: await response.text() };
    } catch (error) {
      if (attempt >= 3) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
};

const pool = async (items, size, fn) => {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: Math.min(size, queue.length) }, async () => {
      while (queue.length) await fn(queue.shift());
    }),
  );
};

/** Crawls every sitemap URL on `base` and collects body links (site chrome excluded). */
export const crawlLinks = async (base) => {
  const { html: xml } = await fetchPage(base, '/sitemap.xml');
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1].trim()).pathname.replace(/\/$/, '') || '/',
  );
  const inbound = new Map();
  const outbound = new Map();
  await pool(paths, 4, async (from) => {
    try {
      const { html, status } = await fetchPage(base, from);
      if (status !== 200) return;
      const targets = new Set();
      extractPage(html).links.forEach((link) => {
        const to = pathOf(link.href, `${base}${from}`);
        if (!to || to === from) return;
        targets.add(to);
        inbound.set(to, [...(inbound.get(to) ?? []), { from, text: link.text }]);
      });
      outbound.set(from, targets);
    } catch {
      // A page that fails to load shows up in its own check.
    }
  });
  return { inbound, outbound, crawled: paths.length };
};

/** Search Console query x page rows for the last 90 days (the marketplace's own property), redirects mapped. */
export const loadGscRows = async () => {
  const window = dateWindow(90);
  const redirects = await loadRedirects();
  const rows = querySearchAnalytics(['query', 'page'], window.start, window.end).map((row) => {
    const raw = urlPath(row.keys[1]).split('#')[0];
    return {
      query: row.keys[0],
      page: redirects.get(raw) ?? raw,
      impressions: row.impressions,
      clicks: row.clicks,
      position: row.position,
    };
  });
  return { rows, window };
};

const daysSince = (isoDate) =>
  isoDate ? Math.floor((Date.now() - new Date(`${isoDate}T00:00:00Z`).getTime()) / 86_400_000) : Infinity;

/**
 * Held note for a page changed in the last 28 days. Holds follow the registry's `updatedAt` (else `publishedAt`),
 * the same date the audit uses, so markup-only commits (like adding id="answer") never start one.
 */
export const pageNotes = (targets) => {
  const changed = targets.page?.updatedAt ?? targets.page?.publishedAt;
  if (!changed || daysSince(changed) >= HOLD_DAYS) return [];
  const until = new Date(new Date(`${changed}T00:00:00Z`).getTime() + HOLD_DAYS * 86_400_000).toISOString().slice(0, 10);
  return [{ kind: 'held', text: `Held: changed ${changed}, no tickets until ${until}.` }];
};

/**
 * Checks one already-fetched page. Used by `seo:qa`, which fetches the page itself.
 * `gscRows` and `links` are optional.
 */
export const checkFetched = (targets, fetched, base, { gscRows = [], links = null } = {}) => {
  const page = extractPage(fetched.html);
  const allowNoindex = base !== PRODUCTION;
  const findings = auditPage(
    page,
    targets,
    { status: fetched.status, finalPath: fetched.finalPath, allowNoindex },
    base,
  );
  if (links)
    findings.push(
      ...auditLinks(targets, links.inbound.get(targets.path) ?? [], links.outbound.get(targets.path) ?? new Set()),
    );
  if (gscRows.length) findings.push(...auditGsc(targets, page, gscRows));
  return { page, findings };
};

/** Fetches and checks every requested page with targets. */
export const runOnpage = async ({ base, paths, gsc, links, log = () => {} }) => {
  const allTargets = await loadTargets();
  const requested = paths?.length ? paths : Array.from(allTargets.keys());
  const missing = requested.filter((pagePath) => !allTargets.has(pagePath));
  const checked = requested.filter((pagePath) => allTargets.has(pagePath));

  let gscRows = [];
  let gscWindow = null;
  if (gsc) {
    log('Fetching Search Console query x page rows (90 days)...');
    ({ rows: gscRows, window: gscWindow } = await loadGscRows());
    // Each query counts only toward its most specific target across every page.
    const allPhrases = Array.from(allTargets.values()).flatMap((t) =>
      [t.primary, ...t.secondary].map((group) => group.phrases),
    );
    const cache = new Map();
    gscRows = gscRows.map((row) => {
      if (!cache.has(row.query)) {
        cache.set(row.query, Math.max(0, ...allPhrases.map((phrases) => matchSpecificity(row.query, phrases))));
      }
      return { ...row, specificity: cache.get(row.query) };
    });
  }
  let crawl = null;
  if (links) {
    log(`Crawling ${base}/sitemap.xml for body links...`);
    crawl = await crawlLinks(base);
    log(`  ${crawl.crawled} pages crawled.`);
  }

  const results = [];
  for (const pagePath of checked) {
    const targets = allTargets.get(pagePath);
    let fetched;
    try {
      fetched = await fetchPage(base, pagePath);
    } catch (error) {
      // Report it and keep going; a fetch failure is never written to the baseline as "known".
      const message = `Couldn't fetch the page: ${error.cause?.code ?? error.message}.`;
      const fix = 'Re-run; check the server is up.';
      const finding = { path: pagePath, group: 'technical', rule: 'fetch', severity: 'must', message, fix };
      results.push({
        path: pagePath,
        targets,
        page: null,
        findings: [{ ...finding, key: `${pagePath}|fetch` }],
        notes: [],
      });
      continue;
    }
    const { page, findings } = checkFetched(targets, fetched, base, { gscRows, links: crawl });
    results.push({ path: pagePath, targets, page, findings, notes: pageNotes(targets) });
  }
  const duplicates = auditDuplicates(
    results.filter((r) => r.page).map((r) => ({ path: r.path, text: r.page.mainText })),
  );
  duplicates.forEach((finding) => results.find((r) => r.path === finding.path)?.findings.push(finding));

  return { results, missing, gscWindow, crawled: crawl?.crawled ?? 0 };
};

/** "NEW" must-fix findings fail the gate; findings in the baseline are "known". */
export const classify = (finding, baseline) => {
  if (finding.excepted) return 'exception';
  return baseline.has(finding.key) ? 'known' : 'new';
};
