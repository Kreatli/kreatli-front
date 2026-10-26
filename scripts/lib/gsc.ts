/**
 * Search Console access for the SEO scripts, through the Composio CLI (`composio` must be installed and
 * logged in, with Google Search Console linked: `composio link google_search_console`).
 */

import { execFileSync } from 'child_process';
import fs from 'fs';

import { SEO_SECTION_PATHS } from '../../src/content/seo/paths';
import { SEO_PAGES } from '../../src/content/seo/registry';
import { SeoPage, SeoPageType } from '../../src/content/seo/types';

export const GSC_SITE = process.env.GSC_SITE || 'sc-domain:marketplace.kreatli.com';

export interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export const runComposio = (slug: string, input: Record<string, unknown>) => {
  const stdout = execFileSync('composio', ['execute', slug, '-d', JSON.stringify(input)], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  // The CLI can print a tip line before the JSON payload, and writes large results to a file instead.
  let result = JSON.parse(stdout.slice(stdout.indexOf('{')));
  if (result.storedInFile && result.outputFilePath) {
    result = JSON.parse(fs.readFileSync(result.outputFilePath, 'utf8'));
  }

  if (!result.successful) {
    throw new Error(`${slug} failed: ${JSON.stringify(result.error)}`);
  }

  return result.data;
};

export const querySearchAnalytics = (dimensions: string[], startDate: string, endDate: string): GscRow[] => {
  const rowLimit = 25000;
  const rows: GscRow[] = [];

  for (let startRow = 0; ; startRow += rowLimit) {
    const data = runComposio('GOOGLE_SEARCH_CONSOLE_SEARCH_ANALYTICS_QUERY', {
      site_url: GSC_SITE,
      start_date: startDate,
      end_date: endDate,
      dimensions,
      row_limit: rowLimit,
      start_row: startRow,
    });
    const page: GscRow[] = data.rows ?? [];
    rows.push(...page);
    if (page.length < rowLimit) return rows;
  }
};

export const inspectUrl = (url: string) =>
  runComposio('GOOGLE_SEARCH_CONSOLE_INSPECT_URL', { site_url: GSC_SITE, inspection_url: url })?.inspectionResult
    ?.indexStatusResult;

const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);

/** Search Console data lags ~2-3 days, so windows end 3 days ago. */
export const dateWindow = (days: number, endOffsetDays = 3) => {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - endOffsetDays);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days + 1);
  return { start: toIsoDate(start), end: toIsoDate(end) };
};

export const previousWindow = (window: { start: string }, days: number) => {
  const end = new Date(`${window.start}T00:00:00Z`);
  end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days + 1);
  return { start: toIsoDate(start), end: toIsoDate(end) };
};

export const urlPath = (url: string) => new URL(url).pathname.replace(/\/$/, '') || '/';

const sectionToType = Object.fromEntries(
  Object.entries(SEO_SECTION_PATHS).map(([type, sectionPath]) => [sectionPath, type as SeoPageType]),
) as Record<string, SeoPageType>;

/** Maps a site path to its registry page, if it is an SEO page. */
export const pageForPath = (pagePath: string): SeoPage | undefined => {
  const match = pagePath.match(/^(\/[^/]+)\/([^/]+)$/);
  if (!match) return undefined;
  const type = sectionToType[match[1]];
  return type ? SEO_PAGES.find((page) => page.type === type && page.slug === match[2]) : undefined;
};
