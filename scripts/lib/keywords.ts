/**
 * Keyword helpers shared by the SEO scripts: topic-word matching, and Google Ads Keyword Planner volumes
 * through the anidachi repo's `google-ads:keywords` script (it holds the Ads OAuth token and developer key).
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
    .filter((term) => term && !KEYWORD_STOPWORDS.has(term))
    .map((term) => term.replace(/(ies)$/, 'y').replace(/(?<!s)s$/, ''));

/** Share of the keyword's topic words that appear in the text, plus the ones that are missing. */
export const keywordCoverage = (keyword: string, text: string) => {
  const terms = keywordTerms(keyword);
  const present = new Set(keywordTerms(text));
  const missing = terms.filter((term) => !present.has(term));
  return { coverage: terms.length ? (terms.length - missing.length) / terms.length : 1, missing };
};

export interface KeywordIdea {
  text: string;
  avgMonthlySearches: number | null;
  competition: string | null;
}

const DEFAULT_PLANNER_DIR = '/Users/macgeorge/Downloads/VibeProjects/anidachi-LP/anidachi/apps/web';

export const keywordPlannerDir = () => process.env.KEYWORD_PLANNER_DIR || DEFAULT_PLANNER_DIR;

/**
 * Runs `pnpm google-ads:keywords -- <seeds>` in the anidachi web app and parses its output lines:
 *   - clipper job | searches/mo: 1,600 | competition: LOW | bid: $0.49-$4.88
 * Returns up to 25 ideas for the combined seeds.
 */
export const keywordIdeas = (seeds: string[]): KeywordIdea[] => {
  const dir = keywordPlannerDir();

  if (!fs.existsSync(dir)) {
    throw new Error(
      `Keyword Planner script not found at ${dir}. Set KEYWORD_PLANNER_DIR to the anidachi apps/web folder.`,
    );
  }

  const stdout = execFileSync('pnpm', ['-s', 'google-ads:keywords', '--', ...seeds], {
    cwd: dir,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  return stdout
    .split('\n')
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const [text, searches, competition] = line.slice(2).split(' | ');
      const volume = searches?.replace('searches/mo:', '').trim().replace(/,/g, '');
      const level = competition?.replace('competition:', '').trim();
      return {
        text: text.trim(),
        avgMonthlySearches: volume && volume !== 'n/a' ? Number(volume) : null,
        competition: level && level !== 'n/a' ? level : null,
      };
    });
};

/** Volume for one exact keyword (null when Keyword Planner has no data for it). */
export const keywordVolume = (keyword: string) => {
  const ideas = keywordIdeas([keyword]);
  const exact = ideas.find((idea) => idea.text.toLowerCase() === keyword.toLowerCase());
  return { exact: exact ?? null, related: ideas.filter((idea) => idea !== exact) };
};
