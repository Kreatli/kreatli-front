/**
 * Content QA gate for SEO pages. A page must pass (no FAIL results) before its registry status is set
 * to 'published'. Checks what a script can check; the seo-qa skill covers the judgement calls
 * (claims, tone, usefulness).
 *
 * Usage:
 *   npm run seo:qa -- what-is-a-clipper          # one page (any status)
 *   npm run seo:qa -- glossary/what-is-a-clipper # when a slug exists in two sections
 *   npm run seo:qa -- --all                      # every published page, summary only
 *   npm run seo:qa -- what-is-a-clipper --json   # machine-readable output
 *
 * Exits with code 1 when any checked page has a FAIL.
 */

import fs from 'fs';
import path from 'path';

import { getPageTitle } from '../src/constants/brand';
import { extractFaqs, loadPageBody } from '../src/content/seo/loadPage';
import { SEO_SECTION_PATHS } from '../src/content/seo/paths';
import { SEO_PAGES } from '../src/content/seo/registry';
import { SeoPage, SeoPageType } from '../src/content/seo/types';
import { keywordCoverage } from './lib/keywords';
import { loadRedirects } from './lib/redirects';

type Level = 'pass' | 'warn' | 'fail';

interface CheckResult {
  name: string;
  level: Level;
  detail: string;
}

const MIN_WORDS: Record<SeoPageType, number> = {
  glossary: 400,
  guide: 900,
  hire: 700,
  compare: 800,
  alternatives: 800,
};

// Roughly a 7th-grade reading level; the syllable count is a heuristic, so allow some slack before failing.
const MAX_GRADE_WARN = 7;
const MAX_GRADE_FAIL = 9;

const MAX_TITLE_LENGTH = 60;
const META_LENGTH = { min: 110, max: 160 };

// Phrases that read as AI filler. Keep this list short and specific; the skill handles style beyond it.
const BANNED_PHRASES = [
  'delve',
  'leverage',
  'unlock',
  'game-changer',
  'game changer',
  'seamless',
  "in today's",
  'navigate the',
  'ever-evolving',
  'elevate',
  'robust',
  'look no further',
  'whether you\'re a',
  'it\'s worth noting',
  'in conclusion',
];

const SITE_ROOT = process.cwd();

// Old URLs that now 301 to a new slug. Linking to them still works but wastes a hop.
let redirectSources = new Set<string>();

/** Picks the result level for a value where higher is worse. */
const levelFor = (value: number, warnAbove: number, failAbove: number): Level => {
  if (value > failAbove) return 'fail';
  if (value > warnAbove) return 'warn';
  return 'pass';
};

const toPlainText = (markdown: string) =>
  markdown
    .replace(/^\|.*\|$/gm, ' ')
    .replace(/^#+\s.*$/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>]/g, '');

const countSyllables = (word: string) => {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (w.length <= 3) return 1;
  const trimmed = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  return Math.max(1, (trimmed.match(/[aeiouy]{1,2}/g) || []).length);
};

// Flesch-Kincaid grade level. List items and paragraphs count as sentence breaks.
const readingGrade = (plain: string) => {
  const words = plain.match(/[A-Za-z0-9$][A-Za-z0-9$'.,%+-]*/g) ?? [];
  const sentences = plain
    .split(/[.!?]+\s|\n\s*\n|\n\s*[-+]\s|\n\s*\d+\.\s/)
    .filter((s) => s.trim().split(/\s+/).length > 2);
  const syllables = words.reduce((total, word) => total + countSyllables(word), 0);
  const avgSentence = words.length / Math.max(sentences.length, 1);
  const avgSyllables = syllables / Math.max(words.length, 1);

  return {
    words: words.length,
    grade: 0.39 * avgSentence + 11.8 * avgSyllables - 15.59,
    avgSentence,
  };
};

const sectionToType = Object.fromEntries(
  Object.entries(SEO_SECTION_PATHS).map(([type, sectionPath]) => [sectionPath.slice(1), type as SeoPageType]),
) as Record<string, SeoPageType>;

const pageRouteExists = (route: string) => {
  const base = path.join(SITE_ROOT, 'src/pages', route);
  return fs.existsSync(`${base}.tsx`) || fs.existsSync(path.join(base, 'index.tsx'));
};

const findBrokenLinks = (markdown: string) => {
  const links = Array.from(markdown.matchAll(/\]\((\/[^)\s#?]*)[^)]*\)/g)).map((match) => match[1].replace(/\/$/, ''));
  const redirected = links.filter((link) => redirectSources.has(link));
  const broken = links.filter((link) => {
    if (redirectSources.has(link)) return false;
    if (fs.existsSync(path.join(SITE_ROOT, 'public', link))) return false;

    const [, section, slug] = link.split('/');
    const type = sectionToType[section];

    if (type && slug) {
      return !SEO_PAGES.some((page) => page.type === type && page.slug === slug && page.status === 'published');
    }

    return !pageRouteExists(link);
  });

  return { links, broken, redirected };
};

export const checkPage = (page: SeoPage): CheckResult[] => {
  const results: CheckResult[] = [];
  const add = (name: string, level: Level, detail: string) => results.push({ name, level, detail });
  const raw = loadPageBody(page.type, page.slug);

  if (!raw) {
    add('body', 'fail', `missing src/content/seo/bodies/${page.type}/${page.slug}.md`);
    return results;
  }

  const [firstLine, ...rest] = raw.split('\n');
  const bodyWithoutH1 = rest.join('\n');
  const plain = toPlainText(bodyWithoutH1);
  const { words, grade, avgSentence } = readingGrade(plain);
  const keyword = page.primaryKeyword.toLowerCase();
  const first100 = plain.split(/\s+/).filter(Boolean).slice(0, 100).join(' ')
    .toLowerCase();

  // Structure
  const hasH1 = firstLine.startsWith('# ');
  add('h1', hasH1 ? 'pass' : 'fail', hasH1 ? 'body starts with "# Title"' : 'body must start with a "# Title" line');
  const minWords = MIN_WORDS[page.type];
  add('word count', words >= minWords ? 'pass' : 'warn', `${words} words (min ${minWords} for ${page.type})`);

  // Readability
  add(
    'reading level',
    levelFor(grade, MAX_GRADE_WARN, MAX_GRADE_FAIL),
    `grade ${grade.toFixed(1)}, ${avgSentence.toFixed(1)} words per sentence (target <= ${MAX_GRADE_WARN})`,
  );

  // AI tells
  const emDashes = (raw.match(/—/g) || []).length;
  add(
    'em dashes',
    emDashes === 0 ? 'pass' : 'fail',
    emDashes === 0 ? 'none' : `${emDashes} found; rewrite with commas, colons or full stops`,
  );
  const lower = raw.toLowerCase();
  const banned = BANNED_PHRASES.filter((phrase) => lower.includes(phrase));
  add('filler phrases', banned.length === 0 ? 'pass' : 'fail', banned.length === 0 ? 'none' : banned.join(', '));

  // Keyword placement
  const inTitle = keywordCoverage(page.primaryKeyword, `${page.title} ${page.seoTitle ?? ''}`);
  const missingInTitle = inTitle.missing.length ? `, missing: ${inTitle.missing.join(', ')}` : '';
  add('keyword in title', levelFor(1 - inTitle.coverage, 0, 0.5), `"${page.primaryKeyword}"${missingInTitle}`);
  const inH1 = keywordCoverage(page.primaryKeyword, firstLine);
  add('keyword in H1', inH1.coverage === 1 ? 'pass' : 'warn', firstLine.replace(/^#\s*/, ''));
  const early = first100.includes(keyword) || keywordCoverage(page.primaryKeyword, first100).coverage === 1;
  add('keyword early', early ? 'pass' : 'warn', early ? 'topic words in first 100 words' : 'not in first 100 words');

  // Metadata
  const renderedTitle = getPageTitle(page.seoTitle ?? page.title);
  const titleHint = page.seoTitle ? '' : ' (add seoTitle if too long)';
  add(
    'title length',
    renderedTitle.length <= MAX_TITLE_LENGTH ? 'pass' : 'warn',
    `${renderedTitle.length} chars: "${renderedTitle}"${titleHint}`,
  );
  const metaLength = page.metaDescription.length;
  const metaOk = metaLength >= META_LENGTH.min && metaLength <= META_LENGTH.max;
  add('meta description', metaOk ? 'pass' : 'warn', `${metaLength} chars (target ${META_LENGTH.min}-${META_LENGTH.max})`);
  const duplicateMeta = SEO_PAGES.find((other) => other !== page && other.metaDescription === page.metaDescription);
  if (duplicateMeta) add('unique meta', 'fail', `same meta description as ${duplicateMeta.type}/${duplicateMeta.slug}`);

  // Cannibalisation
  const sameKeyword = SEO_PAGES.filter(
    (other) => other !== page && other.status === 'published' && other.primaryKeyword.toLowerCase() === keyword,
  );
  if (sameKeyword.length) {
    const others = sameKeyword.map((other) => `${other.type}/${other.slug}`).join(', ');
    add('unique keyword', 'fail', `also targeted by ${others}`);
  }

  // Links
  const { links, broken, redirected } = findBrokenLinks(bodyWithoutH1);
  add('internal links', links.length >= 3 ? 'pass' : 'warn', `${links.length} internal links (aim for 3+)`);
  add('broken links', broken.length === 0 ? 'pass' : 'fail', broken.length === 0 ? 'none' : broken.join(', '));
  if (redirected.length) add('redirected links', 'warn', `link to the new URL instead: ${redirected.join(', ')}`);
  const relatedMissing = (page.relatedSlugs ?? []).filter(
    (slug) => !SEO_PAGES.some((other) => other.slug === slug && other.status === 'published'),
  );
  if (relatedMissing.length) add('related pages', 'fail', `not published: ${relatedMissing.join(', ')}`);

  // FAQ (published as FAQPage structured data)
  const faqs = extractFaqs(bodyWithoutH1);
  add('faq', faqs.length >= 3 ? 'pass' : 'warn', `${faqs.length} questions parsed from "## FAQ"`);

  // Freshness
  if (!page.updatedAt && !page.publishedAt) add('dates', 'warn', 'no publishedAt or updatedAt');

  return results;
};

const resolvePage = (arg: string) => {
  const [maybeType, maybeSlug] = arg.includes('/') ? arg.split('/') : [undefined, arg];
  const type = maybeType ? (sectionToType[maybeType] ?? (maybeType as SeoPageType)) : undefined;
  const matches = SEO_PAGES.filter((page) => page.slug === maybeSlug && (!type || page.type === type));

  if (matches.length === 0) throw new Error(`No registry page with slug "${arg}"`);
  if (matches.length > 1) {
    throw new Error(`"${arg}" is ambiguous; use type/slug (${matches.map((p) => p.type).join(', ')})`);
  }

  return matches[0];
};

const ICON: Record<Level, string> = { pass: 'PASS', warn: 'WARN', fail: 'FAIL' };

const run = async () => {
  redirectSources = new Set((await loadRedirects()).keys());

  const args = process.argv.slice(2).filter((arg) => !arg.endsWith('.ts') && arg !== '--');
  const asJson = args.includes('--json');
  const checkAll = args.includes('--all');
  const targets = args.filter((arg) => !arg.startsWith('--'));

  if (!checkAll && targets.length === 0) {
    console.error('Usage: npm run seo:qa -- <slug | type/slug> [--json]   or   npm run seo:qa -- --all');
    process.exit(1);
  }

  const pages = checkAll ? SEO_PAGES.filter((page) => page.status === 'published') : targets.map(resolvePage);
  const report = pages.map((page) => ({ page: `${page.type}/${page.slug}`, results: checkPage(page) }));
  const failed = report.filter(({ results }) => results.some((r) => r.level === 'fail'));

  if (asJson) {
    console.log(JSON.stringify(report, null, 2));
  } else if (checkAll) {
    report.forEach(({ page, results }) => {
      const fails = results.filter((r) => r.level === 'fail');
      const warns = results.filter((r) => r.level === 'warn');
      if (!fails.length && !warns.length) return;
      console.log(`${fails.length ? 'FAIL' : 'WARN'}  ${page}`);
      [...fails, ...warns].forEach((r) => console.log(`        ${ICON[r.level]} ${r.name}: ${r.detail}`));
    });
    console.log(`\n${pages.length} pages checked: ${pages.length - failed.length} pass, ${failed.length} fail`);
  } else {
    report.forEach(({ page, results }) => {
      console.log(`\n${page}`);
      results.forEach((r) => console.log(`  ${ICON[r.level]}  ${r.name}: ${r.detail}`));
      const verdict = results.some((r) => r.level === 'fail') ? 'FAIL' : 'PASS';
      console.log(`\n  Result: ${verdict}`);
    });
  }

  process.exit(failed.length ? 1 : 0);
};

if (require.main === module) {
  run().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
