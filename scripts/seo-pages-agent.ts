/**
 * Helper for the marketplace-kreatli-seo-pages agent.
 *
 * Usage:
 *   npm run seo-pages:list              # all draft pages
 *   npm run seo-pages:list -- --wave 1  # wave 1 drafts only
 *   npm run seo-pages:next -- --count 5 # next 5 recommended drafts
 */

import fs from 'fs';
import path from 'path';

import { SEO_PAGES } from '../src/content/seo/registry';
import { SeoPage, SeoPageType } from '../src/content/seo/types';

const TYPE_PRIORITY: SeoPageType[] = ['compare', 'glossary', 'guide', 'hire'];

const bodyExists = (type: SeoPageType, slug: string) =>
  fs.existsSync(path.join(process.cwd(), 'src/content/seo/bodies', type, `${slug}.md`));

const sortDrafts = (pages: SeoPage[]) =>
  [...pages].sort((a, b) => {
    if (a.wave !== b.wave) return a.wave - b.wave;
    const typeOrder = TYPE_PRIORITY.indexOf(a.type) - TYPE_PRIORITY.indexOf(b.type);
    if (typeOrder !== 0) return typeOrder;
    return a.id - b.id;
  });

const parseArgs = () => {
  const args = process.argv.slice(2).filter((arg) => !arg.endsWith('.ts'));
  const command = args[0] ?? 'list';
  const waveIdx = args.indexOf('--wave');
  const countIdx = args.indexOf('--count');
  const waveArg = args.find((arg) => arg.startsWith('--wave='))?.split('=')[1]
    ?? (waveIdx >= 0 ? args[waveIdx + 1] : undefined);
  const countArg = args.find((arg) => arg.startsWith('--count='))?.split('=')[1]
    ?? (countIdx >= 0 ? args[countIdx + 1] : undefined);

  return {
    command,
    wave: waveArg && !Number.isNaN(Number(waveArg)) ? Number(waveArg) : undefined,
    count: countArg && !Number.isNaN(Number(countArg)) ? Number(countArg) : 5,
  };
};

const formatPage = (page: SeoPage) => {
  const url = `/${page.type === 'guide' ? 'guides' : page.type}/${page.slug}`;
  const hasBody = bodyExists(page.type, page.slug);

  return [
    `#${page.id} ${page.type.padEnd(8)} wave=${page.wave}`,
    `  url:      ${url}`,
    `  title:    ${page.title}`,
    `  keyword:  ${page.primaryKeyword}`,
    `  status:   ${page.status}${hasBody ? ' (body exists)' : ''}`,
    page.notes ? `  notes:    ${page.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n');
};

const run = () => {
  const { command, wave, count } = parseArgs();

  const drafts = sortDrafts(
    SEO_PAGES.filter((page) => {
      if (page.status !== 'draft') return false;
      if (wave !== undefined && page.wave !== wave) return false;
      return true;
    }),
  );

  const published = SEO_PAGES.filter((page) => page.status === 'published');

  if (command === 'stats') {
    console.log(`Published: ${published.length}`);
    console.log(`Draft:     ${drafts.length}`);
    console.log(`Total:     ${SEO_PAGES.length}`);
    TYPE_PRIORITY.forEach((type) => {
      const pub = published.filter((p) => p.type === type).length;
      const draft = drafts.filter((p) => p.type === type).length;
      console.log(`  ${type}: ${pub} published, ${draft} draft`);
    });
    return;
  }

  if (command === 'next') {
    const recommended = drafts.slice(0, count);

    if (recommended.length === 0) {
      console.log('No draft pages available.');
      return;
    }

    console.log(`Next ${recommended.length} page(s) to create:\n`);
    recommended.forEach((page) => {
      console.log(formatPage(page));
      console.log(`  body:     src/content/seo/bodies/${page.type}/${page.slug}.md`);
      console.log('');
    });
    return;
  }

  // default: list
  console.log(`Draft pages${wave !== undefined ? ` (wave ${wave})` : ''}: ${drafts.length}\n`);
  drafts.forEach((page) => {
    console.log(formatPage(page));
    console.log('');
  });
};

run();
