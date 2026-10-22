/**
 * Appends new pages from the marketplace SEO plan spreadsheet to src/content/seo/registry.ts.
 *
 * The registry is maintained by hand after import (titles, meta descriptions, related pages, dates),
 * so this script never overwrites an existing page: rows whose id or slug is already in the registry
 * are skipped, and new rows are added as drafts.
 *
 * Usage: npm run import-seo-plan [path-to-xlsx]
 * Default xlsx: ../marketplace-kreatli-50-page-plan (1).xlsx (relative to project root parent)
 */

import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

import { SEO_PAGES } from '../src/content/seo/registry';
import { SeoPage } from '../src/content/seo/types';
import { writeRegistry } from './lib/writeRegistry';

const BRAND_NAME = 'Kreatli Marketplace';

const TYPE_MAP: Record<string, string> = {
  Compare: 'compare',
  Glossary: 'glossary',
  Guide: 'guide',
  'Hire-Niche': 'hire',
};

const FUNNEL_MAP: Record<string, string> = {
  Creator: 'creator',
  Clipper: 'clipper',
  Both: 'both',
};

const INTENT_MAP: Record<string, string> = {
  Commercial: 'commercial',
  Informational: 'informational',
  Transactional: 'transactional',
};

const defaultXlsx = path.resolve(
  process.cwd(),
  '../../marketplace-kreatli-50-page-plan (1).xlsx',
);

const xlsxPath = process.argv[2] ? path.resolve(process.argv[2]) : defaultXlsx;

if (!fs.existsSync(xlsxPath)) {
  console.error(`Spreadsheet not found: ${xlsxPath}`);
  process.exit(1);
}

const workbook = XLSX.readFile(xlsxPath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json<Record<string, string | number>>(sheet);

const pages = rows
  .filter((row) => row['#'])
  .map((row) => {
    const url = String(row['URL Slug'] ?? '');
    const slug = url.replace(/^\/+/, '').split('/').pop() ?? '';
    const pageType = TYPE_MAP[String(row['Page Type'] ?? '')] ?? 'guide';
    const waveMatch = String(row.Wave ?? '1').match(/\d+/);
    const wave = waveMatch ? Number(waveMatch[0]) : 1;
    const title = String(row['Page Title (H1)'] ?? '');
    const dependency = row['Dependency / Gate'];
    const dep = dependency && dependency !== 'None' ? String(dependency) : undefined;

    return {
      id: Number(row['#']),
      type: pageType,
      funnelSide: FUNNEL_MAP[String(row['Funnel Side'] ?? '')] ?? 'both',
      slug,
      title,
      metaDescription: `${title}. Learn how ${BRAND_NAME} helps creators and clippers in the video editing marketplace.`,
      primaryKeyword: String(row['Primary Target Keyword'] ?? ''),
      searchIntent: INTENT_MAP[String(row['Search Intent'] ?? '')] ?? 'informational',
      wave,
      dependency: dep,
      status: 'draft',
      notes: row.Notes ? String(row.Notes) : undefined,
      ctaHref: pageType === 'hire' ? '/jobs/create' : undefined,
    };
  });

// Match on type + slug: registry ids beyond the spreadsheet's rows were assigned by hand, so a new
// row's spreadsheet number may already be taken. New rows get the next free ids instead.
const existingSlugs = new Set(SEO_PAGES.map((page) => `${page.type}/${page.slug}`));
const firstNewId = Math.max(...SEO_PAGES.map((page) => page.id)) + 1;

const newPages = pages
  .filter((page) => !existingSlugs.has(`${page.type}/${page.slug}`))
  .map((page, index) => ({ ...page, id: firstNewId + index })) as SeoPage[];

if (newPages.length === 0) {
  console.log(`No new pages: all ${pages.length} spreadsheet rows are already in the registry.`);
  process.exit(0);
}

writeRegistry([...SEO_PAGES, ...newPages]);
console.log(`Added ${newPages.length} draft page(s): ${newPages.map((page) => page.slug).join(', ')}`);
console.log('Write a unique metaDescription for each before publishing; the imported one is a placeholder.');
