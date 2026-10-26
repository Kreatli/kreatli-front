/**
 * Weekly Search Console audit of published SEO pages. Writes findings to .seo-reports/ for the seo-audit
 * skill, which turns them into Linear tickets. It never edits content.
 *
 * Usage:
 *   npm run seo:audit                 # report + JSON in .seo-reports/
 *   npm run seo:audit -- --inspect    # also run URL Inspection on pages with no impressions (slower)
 *
 * Rules (see .claude/skills/seo-audit/SKILL.md for how each becomes a ticket):
 *   low-ctr        position <= 10, >= 100 impressions in 28d, CTR < 2%        -> rewrite title/meta
 *   striking       position 8-20, >= 50 impressions in 90d                     -> rewrite, expand
 *   poor-fit       position > 40, >= 200 impressions in 90d                    -> retarget or merge
 *   declining      28d impressions down 40%+ (from >= 50) or position 5+ worse -> investigate
 *   no-impressions published/updated 14+ days ago, 0 impressions in 90d       -> technical, indexing
 * Pages changed in the last 28 days are listed as "held" instead: their data reflects old content.
 */

import fs from 'fs';
import path from 'path';

import { getAbsoluteUrl, getPageUrl } from '../src/content/seo/paths';
import { SEO_PAGES } from '../src/content/seo/registry';
import { SeoPage } from '../src/content/seo/types';
import { dateWindow, GscRow, inspectUrl, pageForPath, previousWindow, querySearchAnalytics, urlPath } from './lib/gsc';
import { loadRedirects } from './lib/redirects';

const FRESH_DAYS = 28;
const INDEXING_GRACE_DAYS = 14;
const MAX_INSPECTIONS = 20;
const REPORT_DIR = path.join(process.cwd(), '.seo-reports');

type Rule = 'low-ctr' | 'striking' | 'poor-fit' | 'declining' | 'no-impressions';

const RULE_ORDER: Rule[] = ['low-ctr', 'striking', 'poor-fit', 'declining', 'no-impressions'];

interface PageStats {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface QueryStats {
  query: string;
  clicks: number;
  impressions: number;
  position: number;
}

interface Finding {
  rule: Rule;
  label: 'rewrite' | 'technical';
  page: string;
  url: string;
  primaryKeyword: string;
  reason: string;
  last28: PageStats | null;
  prev28: PageStats | null;
  last90: PageStats | null;
  topQueries: QueryStats[];
  indexStatus?: string;
}

const daysSince = (isoDate: string | undefined, from: Date) => {
  if (!isoDate) return Infinity;
  return Math.floor((from.getTime() - new Date(`${isoDate}T00:00:00Z`).getTime()) / 86_400_000);
};

/** Sums rows per page path, following redirects so old URLs count toward the page that replaced them. */
const aggregateByPath = (rows: GscRow[], redirects: Map<string, string>) => {
  const totals = new Map<string, { clicks: number; impressions: number; weightedPosition: number }>();

  rows.forEach((row) => {
    const rawPath = urlPath(row.keys[0]);
    const key = redirects.get(rawPath) ?? rawPath;
    const entry = totals.get(key) ?? { clicks: 0, impressions: 0, weightedPosition: 0 };
    totals.set(key, {
      clicks: entry.clicks + row.clicks,
      impressions: entry.impressions + row.impressions,
      weightedPosition: entry.weightedPosition + row.position * row.impressions,
    });
  });

  const result = new Map<string, PageStats>();
  totals.forEach((entry, key) => {
    result.set(key, {
      clicks: entry.clicks,
      impressions: entry.impressions,
      ctr: entry.impressions ? entry.clicks / entry.impressions : 0,
      position: entry.impressions ? entry.weightedPosition / entry.impressions : 0,
    });
  });
  return result;
};

const formatStats = (stats: PageStats | null) => {
  if (!stats) return 'no data';
  const ctr = (stats.ctr * 100).toFixed(1);
  return `${stats.impressions} impr, ${stats.clicks} clicks, ${ctr}% CTR, pos ${stats.position.toFixed(1)}`;
};

const evaluate = (last28: PageStats | null, prev28: PageStats | null, last90: PageStats | null) => {
  const found: { rule: Rule; reason: string }[] = [];

  if (last28 && last28.position <= 10 && last28.impressions >= 100 && last28.ctr < 0.02) {
    found.push({
      rule: 'low-ctr',
      reason:
        `Page 1 (pos ${last28.position.toFixed(1)}) but ${(last28.ctr * 100).toFixed(1)}% CTR on ` +
        `${last28.impressions} impressions: title/meta don't match the queries.`,
    });
  }
  if (last90 && last90.position > 8 && last90.position <= 20 && last90.impressions >= 50) {
    found.push({
      rule: 'striking',
      reason:
        `Position ${last90.position.toFixed(1)} on ${last90.impressions} impressions (90d): ` +
        'close to page 1, expand and strengthen.',
    });
  }
  if (last90 && last90.position > 40 && last90.impressions >= 200) {
    found.push({
      rule: 'poor-fit',
      reason:
        `Position ${last90.position.toFixed(1)} on ${last90.impressions} impressions (90d): ` +
        "ranking for terms it can't win. Retarget or merge.",
    });
  }
  if (last28 && prev28 && prev28.impressions >= 50) {
    const drop = 1 - last28.impressions / prev28.impressions;
    const positionLoss = last28.position - prev28.position;
    if (drop >= 0.4 || positionLoss >= 5) {
      found.push({
        rule: 'declining',
        reason:
          `Impressions ${prev28.impressions} -> ${last28.impressions}, position ${prev28.position.toFixed(1)} -> ` +
          `${last28.position.toFixed(1)} vs previous 28 days.`,
      });
    }
  }

  return found;
};

const groupQueriesByPath = (rows: GscRow[], redirects: Map<string, string>) => {
  const byPath = new Map<string, QueryStats[]>();
  rows.forEach((row) => {
    const rawPath = urlPath(row.keys[0]);
    const key = redirects.get(rawPath) ?? rawPath;
    byPath.set(key, [
      ...(byPath.get(key) ?? []),
      { query: row.keys[1], clicks: row.clicks, impressions: row.impressions, position: +row.position.toFixed(1) },
    ]);
  });
  return byPath;
};

const renderReport = (
  reportDate: string,
  windows: Record<'last28' | 'prev28' | 'last90', { start: string; end: string }>,
  findings: Finding[],
  held: { page: SeoPage; changedDaysAgo: number; last90: PageStats | null }[],
  otherPages: [string, PageStats][],
) => {
  const { last28, prev28, last90 } = windows;
  const lines = [
    `# SEO audit ${reportDate}`,
    '',
    `Windows: last 28d ${last28.start} to ${last28.end}, previous 28d ${prev28.start} to ${prev28.end}, ` +
      `90d ${last90.start} to ${last90.end}.`,
    '',
    `## Findings (${findings.length})`,
    '',
  ];

  RULE_ORDER.forEach((rule) => {
    const ruleFindings = findings.filter((finding) => finding.rule === rule);
    if (!ruleFindings.length) return;
    lines.push(`### ${rule} (${ruleFindings.length})`, '');
    ruleFindings.forEach((finding) => {
      lines.push(`- **${finding.page}** [${finding.label}] ${finding.reason}`);
      lines.push(
        `  - 28d: ${formatStats(finding.last28)} · prev 28d: ${formatStats(finding.prev28)} · ` +
          `90d: ${formatStats(finding.last90)}`,
      );
      if (finding.indexStatus) lines.push(`  - Index status: ${finding.indexStatus}`);
      finding.topQueries.slice(0, 5).forEach((q) => {
        lines.push(`  - "${q.query}": ${q.impressions} impr, ${q.clicks} clicks, pos ${q.position}`);
      });
    });
    lines.push('');
  });

  lines.push(`## Held: changed in the last ${FRESH_DAYS} days (${held.length})`, '');
  held.forEach(({ page, changedDaysAgo, last90: stats }) => {
    lines.push(`- ${page.type}/${page.slug}: changed ${changedDaysAgo}d ago · 90d: ${formatStats(stats)}`);
  });
  lines.push('', '## Other pages with traffic (not in the registry)', '');
  otherPages.forEach(([pagePath, stats]) => lines.push(`- ${pagePath}: ${formatStats(stats)}`));

  return `${lines.join('\n')}\n`;
};

const run = async () => {
  const inspect = process.argv.includes('--inspect');
  const redirects = await loadRedirects();
  const windows = { last28: dateWindow(28), prev28: previousWindow(dateWindow(28), 28), last90: dateWindow(90) };
  const today = new Date();

  console.log(`Fetching Search Console data (${windows.last90.start} to ${windows.last90.end})...`);
  const by28 = aggregateByPath(querySearchAnalytics(['page'], windows.last28.start, windows.last28.end), redirects);
  const byPrev = aggregateByPath(querySearchAnalytics(['page'], windows.prev28.start, windows.prev28.end), redirects);
  const by90 = aggregateByPath(querySearchAnalytics(['page'], windows.last90.start, windows.last90.end), redirects);
  const queriesByPath = groupQueriesByPath(
    querySearchAnalytics(['page', 'query'], windows.last90.start, windows.last90.end),
    redirects,
  );

  const findings: Finding[] = [];
  const held: { page: SeoPage; changedDaysAgo: number; last90: PageStats | null }[] = [];

  SEO_PAGES.filter((page) => page.status === 'published').forEach((page) => {
    const pagePath = getPageUrl(page.type, page.slug);
    const last28 = by28.get(pagePath) ?? null;
    const prev28 = byPrev.get(pagePath) ?? null;
    const last90 = by90.get(pagePath) ?? null;
    const changedDaysAgo = daysSince(page.updatedAt ?? page.publishedAt, today);
    const base = {
      page: `${page.type}/${page.slug}`,
      url: getAbsoluteUrl(pagePath),
      primaryKeyword: page.primaryKeyword,
      last28,
      prev28,
      last90,
      topQueries: (queriesByPath.get(pagePath) ?? []).sort((a, b) => b.impressions - a.impressions).slice(0, 10),
    };

    if (!last90 || last90.impressions === 0) {
      if (changedDaysAgo >= INDEXING_GRACE_DAYS) {
        findings.push({
          ...base,
          rule: 'no-impressions',
          label: 'technical',
          reason: `No impressions in 90 days, ${changedDaysAgo} days after publishing or updating. Check indexing.`,
        });
      }
      return;
    }

    if (changedDaysAgo < FRESH_DAYS) {
      held.push({ page, changedDaysAgo, last90 });
      return;
    }

    evaluate(last28, prev28, last90).forEach(({ rule, reason }) => {
      findings.push({ ...base, rule, label: 'rewrite', reason });
    });
  });

  let inspectionsLeft = inspect ? MAX_INSPECTIONS : 0;
  const inspected = findings.map((finding) => {
    if (finding.rule !== 'no-impressions' || inspectionsLeft <= 0) return finding;
    inspectionsLeft -= 1;
    const status = inspectUrl(finding.url);
    return { ...finding, indexStatus: status ? `${status.coverageState} (${status.verdict})` : 'unknown' };
  });

  // Non-registry pages (home, section indexes, tools) with traffic, for context only.
  const otherPages = Array.from(by90.entries())
    .filter(([pagePath]) => !pageForPath(pagePath))
    .sort((a, b) => b[1].impressions - a[1].impressions)
    .slice(0, 10);

  const reportDate = today.toISOString().slice(0, 10);
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const jsonPath = path.join(REPORT_DIR, `audit-${reportDate}.json`);
  const mdPath = path.join(REPORT_DIR, `audit-${reportDate}.md`);
  const heldSummary = held.map(({ page, changedDaysAgo, last90 }) => ({
    page: `${page.type}/${page.slug}`,
    changedDaysAgo,
    last90,
  }));
  fs.writeFileSync(
    jsonPath,
    JSON.stringify({ generatedAt: today.toISOString(), windows, findings: inspected, held: heldSummary }, null, 2),
  );
  fs.writeFileSync(mdPath, renderReport(reportDate, windows, inspected, held, otherPages));

  console.log(`\n${inspected.length} findings, ${held.length} pages held as too fresh.`);
  console.log(`Report: ${path.relative(process.cwd(), mdPath)}`);
  console.log(`JSON:   ${path.relative(process.cwd(), jsonPath)}`);
};

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
