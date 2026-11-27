/**
 * Keyword helpers shared by the SEO scripts: topic-word matching, and Google Ads Keyword Planner volumes
 * through the anidachi repo's `google-ads:keywords` script (it holds the Ads OAuth token and developer key).
 *
 * Volumes always come from exact lookups (`--exact`) for a named market, worldwide by default (owner decision,
 * 27 Nov 2026: clipping demand is global). Ideas mode is only used to discover related searches: its volumes change
 * with whichever keywords share the request, so they are never reported. Ported from kreatli.com (SEO-37).
 */

import { execFileSync } from 'child_process';
import fs from 'fs';

// Words that describe the search intent rather than the topic, so a page doesn't need to repeat them
// ("jump cut definition" is covered by "What Is a Jump Cut?").
const KEYWORD_STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'for', 'to', 'in', 'on', 'with', 'vs', 'versus', 'my', 'your', 'i',
  'what', 'is', 'are', 'does', 'do', 'how', 'meaning', 'definition', 'explained', 'mean',
]);

export const keywordTerms = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9:\s-]/g, ' ')
    .split(/[\s-]+/)
    // Keep colons inside terms like "9:16", but not trailing ones from "Keyword: subtitle" titles.
    .map((term) => term.replace(/^:+|:+$/g, ''))
    .filter((term) => term && !KEYWORD_STOPWORDS.has(term))
    .map((term) => term.replace(/(ies)$/, 'y').replace(/(?<!s)s$/, ''))
    .filter(Boolean);

/** Share of the keyword's topic words that appear in the text, plus the ones that are missing. */
export const keywordCoverage = (keyword: string, text: string) => {
  const terms = keywordTerms(keyword);
  const present = new Set(keywordTerms(text));
  const missing = terms.filter((term) => !present.has(term));
  return { coverage: terms.length ? (terms.length - missing.length) / terms.length : 1, missing };
};

export interface KeywordGroup {
  text: string;
  closeVariants: string[];
  avgMonthlySearches: number | null;
  competition: string | null;
  monthlySearches: { year: number; month: string; searches: number }[];
}

interface PlannerRow extends Partial<KeywordGroup> {
  text: string;
}

const DEFAULT_PLANNER_DIR = '/Users/macgeorge/Downloads/VibeProjects/anidachi-LP/anidachi/apps/web';

export const keywordPlannerDir = () => process.env.KEYWORD_PLANNER_DIR || DEFAULT_PLANNER_DIR;

// Named explicitly, so a volume never depends on the planner script's own default location.
export const MARKETS = {
  worldwide: { label: 'Worldwide, English', args: ['--worldwide', '--lang', '1000'] },
  us: { label: 'United States, English', args: ['--geo', '2840', '--lang', '1000'] },
} as const;

export type Market = keyof typeof MARKETS;

export const DEFAULT_MARKET: Market = 'worldwide';

export const isMarket = (value: string): value is Market => value in MARKETS;

// Keyword Planner rejects the whole request when one keyword breaks these limits.
const MAX_KEYWORD_CHARS = 80;
const MAX_KEYWORD_WORDS = 10;

/** The JSON the planner script prints. Ideas mode prints a "Seeds: ..." line first, so parse from the first `[`. */
export const parsePlannerJson = (stdout: string): PlannerRow[] => {
  const start = stdout.indexOf('[');
  if (start === -1) {
    throw new Error(`Keyword Planner returned no JSON: ${stdout.trim().slice(0, 200)}`);
  }
  return JSON.parse(stdout.slice(start));
};

const runPlanner = (args: string[]) => {
  const dir = keywordPlannerDir();

  if (!fs.existsSync(dir)) {
    throw new Error(
      `Keyword Planner script not found at ${dir}. Set KEYWORD_PLANNER_DIR to the anidachi apps/web folder.`,
    );
  }

  const stdout = execFileSync('pnpm', ['-s', 'google-ads:keywords', '--', ...args, '--json'], {
    cwd: dir,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 64 * 1024 * 1024,
  });

  return parsePlannerJson(stdout);
};

/**
 * Matches each requested keyword to the exact-lookup row that holds it. Google merges close variants that share a
 * request into one row ("clipping job" and "clipping jobs"), so both keywords point at the same group and share its
 * volume. Never add the volumes of one group together.
 */
export const groupExactRows = (keywords: string[], rows: PlannerRow[]) => {
  const byKeyword = new Map<string, KeywordGroup>();

  rows.forEach((row) => {
    const group: KeywordGroup = {
      text: row.text,
      closeVariants: row.closeVariants ?? [],
      avgMonthlySearches: row.avgMonthlySearches ?? null,
      competition: row.competition ?? null,
      monthlySearches: row.monthlySearches ?? [],
    };
    [row.text, ...group.closeVariants].forEach((text) => byKeyword.set(text.toLowerCase(), group));
  });

  return new Map(keywords.map((keyword) => [keyword.toLowerCase(), byKeyword.get(keyword.toLowerCase()) ?? null]));
};

/**
 * Exact monthly volumes for the keywords, in one request. Returns a Map from the lowercased keyword to its group,
 * or null when Keyword Planner has no data for it. If Google rejects the request, it is split in half until the
 * bad keyword is found, and `onSkip` reports it; a missing number is never guessed.
 */
interface VolumeOptions {
  market?: Market;
  onSkip?: (keyword: string, reason: string) => void;
}

export const keywordVolumes = (keywords: string[], options: VolumeOptions = {}) => {
  const { market = DEFAULT_MARKET, onSkip = () => {} } = options;
  const unique = Array.from(new Set(keywords.map((keyword) => keyword.trim().toLowerCase()).filter(Boolean)));
  const accepted = unique.filter((keyword) => {
    const ok = keyword.length <= MAX_KEYWORD_CHARS && keyword.split(/\s+/).length <= MAX_KEYWORD_WORDS;
    if (!ok) onSkip(keyword, 'too long for Keyword Planner');
    return ok;
  });

  const lookUp = (batch: string[]): PlannerRow[] => {
    try {
      return runPlanner(['--exact', ...MARKETS[market].args, ...batch]);
    } catch (error) {
      if (batch.length === 1) {
        onSkip(batch[0], error instanceof Error ? error.message.split('\n')[0] : String(error));
        return [];
      }
      const middle = Math.ceil(batch.length / 2);
      return [...lookUp(batch.slice(0, middle)), ...lookUp(batch.slice(middle))];
    }
  };

  return groupExactRows(unique, accepted.length ? lookUp(accepted) : []);
};

/**
 * Related searches Keyword Planner suggests for the seeds, by text only. Ideas-mode volumes are unstable, so look
 * up the ones you keep with `keywordVolumes`.
 */
export const keywordIdeas = (seeds: string[], { market = DEFAULT_MARKET }: { market?: Market } = {}) =>
  runPlanner([...MARKETS[market].args, ...seeds])
    .map((idea) => idea.text?.trim())
    .filter(Boolean);
