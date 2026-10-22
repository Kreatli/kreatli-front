import fs from 'fs';
import path from 'path';

import { SeoPage } from '../../src/content/seo/types';

const REGISTRY_PATH = path.resolve(process.cwd(), 'src/content/seo/registry.ts');

// Field order in the generated file; anything not listed here is rejected so typos fail loudly.
const FIELD_ORDER: (keyof SeoPage)[] = [
  'id',
  'type',
  'funnelSide',
  'slug',
  'title',
  'seoTitle',
  'metaDescription',
  'primaryKeyword',
  'searchIntent',
  'wave',
  'dependency',
  'status',
  'notes',
  'ctaHref',
  'relatedSlugs',
  'publishedAt',
  'updatedAt',
];

const quote = (value: string) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

const serializeValue = (value: unknown) => {
  if (typeof value === 'number') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => quote(String(item))).join(', ')}]`;
  }

  return quote(String(value));
};

export const serializeRegistry = (pages: SeoPage[]) => {
  const lines = [
    "import { SeoPage } from './types';",
    '',
    '// Source of truth for SEO pages. New rows can be imported from the plan spreadsheet with',
    '// `npm run import-seo-plan`, which only appends pages that are not here yet; everything else',
    '// (titles mirroring each body H1, metaDescription, seoTitle, relatedSlugs, dates) is edited here.',
    'export const SEO_PAGES: SeoPage[] = [',
  ];

  [...pages]
    .sort((a, b) => a.id - b.id)
    .forEach((page) => {
      Object.keys(page).forEach((key) => {
        if (!FIELD_ORDER.includes(key as keyof SeoPage)) {
          throw new Error(`Unknown field "${key}" on ${page.slug}`);
        }
      });

      lines.push('  {');
      FIELD_ORDER.forEach((key) => {
        if (page[key] !== undefined) {
          lines.push(`    ${key}: ${serializeValue(page[key])},`);
        }
      });
      lines.push('  },');
    });

  lines.push('];', '');

  return lines.join('\n');
};

export const writeRegistry = (pages: SeoPage[]) => {
  fs.writeFileSync(REGISTRY_PATH, serializeRegistry(pages));
};
