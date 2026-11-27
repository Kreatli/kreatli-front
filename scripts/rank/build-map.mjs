/**
 * Builds scripts/rank/keyword-map.json from the registry's `targets` (src/content/seo/registry.ts) for the weekly
 * ranking check (SEO-41, ported from kreatli.com's KRE-82). The map is part of the locked method: rebuild it only with
 * the owner's OK, then re-lock (`npm run seo:rank -- --lock <version>`).
 *
 *   npx tsx scripts/rank/build-map.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

import { APP_PAGE_TARGETS } from '../../src/content/seo/appPages.ts';
import { getPageUrl } from '../../src/content/seo/paths.ts';
import { SEO_TARGETS_MARKET } from '../../src/content/seo/types.ts';

export const MAP_FILE = path.join(process.cwd(), 'scripts/rank/keyword-map.json');

const BUYER_TYPES = new Set(['compare', 'alternatives']);

const section = (pagePath, kind, targets) => ({
  key: pagePath,
  title: pagePath,
  target: pagePath,
  kind,
  queries: [targets.primary, ...targets.secondary].map((group) => [
    group.query,
    [group.query, ...(group.variants ?? [])],
    group.volume ?? null,
  ]),
});

/**
 * One section per page with targets: registry pages in registry order, then app pages (src/content/seo/appPages.ts).
 * Each query: [label, variants, volume].
 */
export const mapFromRegistry = (pages, appTargets = {}) => [
  ...pages
    .filter((page) => page.targets)
    .map((page) =>
      section(getPageUrl(page.type, page.slug), BUYER_TYPES.has(page.type) ? 'buyer' : 'content', page.targets),
    ),
  ...Object.entries(appTargets).map(([pagePath, targets]) => section(pagePath, 'content', targets)),
];

const run = async () => {
  const { SEO_PAGES } = await import('../../src/content/seo/registry.ts');
  const map = {
    about:
      'marketplace.kreatli.com weekly ranking check keyword map (SEO-41). Built from the registry and app page targets. Each ' +
      'query: [label, [variants that share one search], monthly volume (exact Keyword Planner, worldwide English)]. ' +
      "Locked with the method; change it only with the owner's OK and a new lock version.",
    market: SEO_TARGETS_MARKET,
    historyStart: '2026-08-31',
    sections: mapFromRegistry(SEO_PAGES, APP_PAGE_TARGETS),
  };
  fs.writeFileSync(MAP_FILE, `${JSON.stringify(map, null, 1)}\n`);
  const queries = map.sections.reduce((n, s) => n + s.queries.length, 0);
  console.log(`${map.sections.length} sections, ${queries} searches -> ${path.relative(process.cwd(), MAP_FILE)}`);
};

if (import.meta.url === `file://${process.argv[1]}`) run();
