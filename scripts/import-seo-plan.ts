/**
 * Regenerates src/content/seo/registry.ts from the marketplace SEO plan spreadsheet.
 *
 * Usage: npm run import-seo-plan [path-to-xlsx]
 * Default xlsx: ../marketplace-kreatli-50-page-plan (1).xlsx (relative to project root parent)
 */

import fs from 'fs';
import path from 'path';

import * as XLSX from 'xlsx';

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
const outputPath = path.resolve(process.cwd(), 'src/content/seo/registry.ts');

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
    const statusRaw = String(row.Status ?? 'Not started');
    const status = statusRaw === 'Drafted' ? 'published' : 'draft';
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
      status,
      notes: row.Notes ? String(row.Notes) : undefined,
      ctaHref: pageType === 'hire' ? '/jobs/create' : undefined,
    };
  });

const lines: string[] = [
  "import { SeoPage } from './types';",
  '',
  '// Auto-generated from marketplace SEO plan spreadsheet. Re-run: npm run import-seo-plan',
  'export const SEO_PAGES: SeoPage[] = [',
];

pages.forEach((page) => {
  const sq = (value: string) => `'${value.replace(/'/g, "\\'")}'`;

  lines.push('  {');
  lines.push(`    id: ${page.id},`);
  lines.push(`    type: ${sq(page.type)},`);
  lines.push(`    funnelSide: ${sq(page.funnelSide)},`);
  lines.push(`    slug: ${sq(page.slug)},`);
  lines.push(`    title: ${sq(page.title)},`);
  lines.push(`    metaDescription: ${sq(page.metaDescription)},`);
  lines.push(`    primaryKeyword: ${sq(page.primaryKeyword)},`);
  lines.push(`    searchIntent: ${sq(page.searchIntent)},`);
  lines.push(`    wave: ${page.wave},`);
  if (page.dependency) {
    lines.push(`    dependency: ${sq(page.dependency)},`);
  }
  lines.push(`    status: ${sq(page.status)},`);
  if (page.notes) {
    lines.push(`    notes: ${sq(page.notes)},`);
  }
  if (page.ctaHref) {
    lines.push(`    ctaHref: ${sq(page.ctaHref)},`);
  }
  lines.push('  },');
});

lines.push('];', '');

fs.writeFileSync(outputPath, lines.join('\n'));
console.log(`Wrote ${pages.length} pages to ${outputPath}`);
