/**
 * Weekly keyword research for the seo-keyword-research skill. Finds Search Console queries the site already
 * shows up for but no registry page targets, adds Keyword Planner volumes, and writes candidates to
 * .seo-reports/. The skill picks the good ones and files `new-page` tickets in Linear.
 *
 * Usage:
 *   npm run seo:keywords                                  # Search Console opportunities
 *   npm run seo:keywords -- --seed "clipping jobs" --seed "whop clipping"   # plus extra seeds
 *   npm run seo:keywords -- --limit 30                    # how many candidates get volume lookups (default 20)
 *
 * Needs the Composio CLI (Search Console) and the anidachi Keyword Planner script (KEYWORD_PLANNER_DIR).
 */

import fs from 'fs';
import path from 'path';

import { SEO_PAGES } from '../src/content/seo/registry';
import { dateWindow, pageForPath, querySearchAnalytics, urlPath } from './lib/gsc';
import { keywordCoverage, KeywordIdea, keywordTerms, keywordVolume } from './lib/keywords';

const REPORT_DIR = path.join(process.cwd(), '.seo-reports');
const MIN_IMPRESSIONS = 10;

interface QueryStats {
  impressions: number;
  clicks: number;
  bestPosition: number;
  pages: string[];
}

interface Candidate {
  query: string;
  source: 'search-console' | 'seed';
  impressions: number;
  clicks: number;
  bestPosition: number | null;
  rankingPages: string[];
  closestRegistryPage: string | null;
  volume: number | null;
  competition: string | null;
  related: KeywordIdea[];
}

const parseArgs = () => {
  const args = process.argv.slice(2).filter((arg) => !arg.endsWith('.ts') && arg !== '--');
  const seeds: string[] = [];
  let limit = 20;

  args.forEach((arg, index) => {
    if (arg === '--seed' && args[index + 1]) seeds.push(args[index + 1]);
    if (arg.startsWith('--seed=')) seeds.push(arg.slice('--seed='.length));
    if (arg === '--limit' && args[index + 1]) limit = Number(args[index + 1]);
    if (arg.startsWith('--limit=')) limit = Number(arg.slice('--limit='.length));
  });

  return { seeds, limit: Number.isNaN(limit) ? 20 : limit };
};

// A query is covered when some page's primary keyword (or title) contains all of its topic words.
const coveringPage = (query: string) =>
  SEO_PAGES.find(
    (page) =>
      keywordCoverage(query, page.primaryKeyword).coverage === 1 ||
      keywordCoverage(page.primaryKeyword, query).coverage === 1 ||
      keywordCoverage(query, page.title).coverage === 1,
  );

/** The registry page sharing the most topic words with the query, as a hint for where it might fit. */
const closestPage = (query: string): string | null => {
  const scored = SEO_PAGES.map((page) => ({
    page: `${page.type}/${page.slug}`,
    score: keywordCoverage(query, `${page.primaryKeyword} ${page.title}`).coverage,
  })).filter(({ score }) => score > 0);

  if (!scored.length) return null;
  return scored.reduce((best, current) => (current.score > best.score ? current : best)).page;
};

const lookUpVolume = (candidate: Candidate): Candidate => {
  try {
    const { exact, related } = keywordVolume(candidate.query);
    return {
      ...candidate,
      volume: exact?.avgMonthlySearches ?? null,
      competition: exact?.competition ?? null,
      related: related.filter((idea) => (idea.avgMonthlySearches ?? 0) >= 10 && !coveringPage(idea.text)).slice(0, 8),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    console.warn(`  volume lookup failed for "${candidate.query}": ${message}`);
    return candidate;
  }
};

const renderRow = (c: Candidate) =>
  [
    c.query,
    c.volume ?? 'n/a',
    c.competition ?? 'n/a',
    c.impressions,
    c.bestPosition ?? '-',
    c.rankingPages.slice(0, 2).join(', ') || '-',
    c.closestRegistryPage ?? '-',
  ].join(' | ');

const run = () => {
  const { seeds, limit } = parseArgs();
  const window = dateWindow(90);

  console.log(`Fetching Search Console queries (${window.start} to ${window.end})...`);
  const rows = querySearchAnalytics(['query', 'page'], window.start, window.end);

  const byQuery = new Map<string, QueryStats>();
  rows.forEach((row) => {
    const [query, url] = row.keys;
    // Skip non-English and navigational noise.
    if (!/^[\x20-\x7e]+$/.test(query) || query.startsWith('site:') || keywordTerms(query).length === 0) return;
    const entry = byQuery.get(query) ?? { impressions: 0, clicks: 0, bestPosition: Infinity, pages: [] };
    const page = pageForPath(urlPath(url));
    const pageLabel = page ? `${page.type}/${page.slug}` : urlPath(url);
    byQuery.set(query, {
      impressions: entry.impressions + row.impressions,
      clicks: entry.clicks + row.clicks,
      bestPosition: Math.min(entry.bestPosition, row.position),
      pages: entry.pages.includes(pageLabel) ? entry.pages : [...entry.pages, pageLabel],
    });
  });

  // Group near-duplicate queries ("clipping job", "clipping jobs") under the highest-impression variant.
  const seenTermSets = new Set<string>();
  const gscCandidates = Array.from(byQuery.entries())
    .filter(([query, stats]) => stats.impressions >= MIN_IMPRESSIONS && !coveringPage(query))
    .sort((a, b) => b[1].impressions - a[1].impressions)
    .filter(([query]) => {
      const key = Array.from(new Set(keywordTerms(query))).sort().join(' ');
      if (seenTermSets.has(key)) return false;
      seenTermSets.add(key);
      return true;
    })
    .slice(0, limit);

  const toCandidate = (query: string, source: Candidate['source']): Candidate => {
    const stats = byQuery.get(query);
    return {
      query,
      source,
      impressions: stats?.impressions ?? 0,
      clicks: stats?.clicks ?? 0,
      bestPosition: stats ? +stats.bestPosition.toFixed(1) : null,
      rankingPages: stats?.pages ?? [],
      closestRegistryPage: closestPage(query),
      volume: null,
      competition: null,
      related: [],
    };
  };

  const candidates = [
    ...gscCandidates.map(([query]) => toCandidate(query, 'search-console')),
    ...seeds.map((seed) => toCandidate(seed, 'seed')),
  ];

  console.log(`Looking up Keyword Planner volumes for ${candidates.length} candidates...`);
  const ranked = candidates
    .map(lookUpVolume)
    .sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0) || b.impressions - a.impressions);

  const reportDate = new Date().toISOString().slice(0, 10);
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const jsonPath = path.join(REPORT_DIR, `keywords-${reportDate}.json`);
  const mdPath = path.join(REPORT_DIR, `keywords-${reportDate}.md`);
  fs.writeFileSync(
    jsonPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), window, candidates: ranked }, null, 2),
  );

  const lines = [
    `# Keyword candidates ${reportDate}`,
    '',
    `Search Console queries (${window.start} to ${window.end}) with ${MIN_IMPRESSIONS}+ impressions that no ` +
      'registry page targets, plus seeds. Volumes from Keyword Planner.',
    '',
    '| Query | Volume/mo | Competition | GSC impr | Best pos | Ranking now | Closest registry page |',
    '|---|---|---|---|---|---|---|',
    ...ranked.map((c) => `| ${renderRow(c)} |`),
    '',
    '## Related ideas (not covered by the registry)',
    '',
    ...ranked
      .filter((c) => c.related.length)
      .map((c) => {
        const ideas = c.related.map((idea) => `${idea.text} (${idea.avgMonthlySearches})`).join(', ');
        return `- **${c.query}**: ${ideas}`;
      }),
  ];
  fs.writeFileSync(mdPath, `${lines.join('\n')}\n`);

  console.log(`\n${ranked.length} candidates.`);
  console.log(`Report: ${path.relative(process.cwd(), mdPath)}`);
  console.log(`JSON:   ${path.relative(process.cwd(), jsonPath)}`);
};

run();
