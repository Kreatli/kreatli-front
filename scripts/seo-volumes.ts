/**
 * Exact Keyword Planner volumes for the keywords you name, in one request (SEO-37). Use this for every volume in a
 * ticket or brief, instead of calling the planner script directly: ideas-mode numbers change with the batch.
 *
 * Usage:
 *   npm run seo:volumes -- "clip farming" "clipping jobs"             # worldwide (default)
 *   npm run seo:volumes -- --market us "clip farming"
 *   npm run seo:volumes -- --json "clip farming"
 *
 * Close variants share one volume: they are printed together and must never be added up. A keyword with no data
 * prints "no data"; never guess a number for it.
 */

import { DEFAULT_MARKET, isMarket, keywordVolumes, Market, MARKETS } from './lib/keywords';

const parseArgs = () => {
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  let market: Market = DEFAULT_MARKET;
  let json = false;
  const keywords: string[] = [];
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--json') json = true;
    else if (args[i] === '--market') {
      i += 1;
      if (!isMarket(args[i] ?? '')) throw new Error(`Unknown market "${args[i]}". Use: ${Object.keys(MARKETS).join(', ')}`);
      market = args[i] as Market;
    } else if (args[i].startsWith('--')) throw new Error(`Unknown option ${args[i]}`);
    else keywords.push(args[i]);
  }
  if (!keywords.length) throw new Error('Name at least one keyword.');
  return { market, json, keywords };
};

const run = () => {
  const { market, json, keywords } = parseArgs();
  const skipped: string[] = [];
  const volumes = keywordVolumes(keywords, {
    market,
    onSkip: (keyword, reason) => skipped.push(`${keyword}: ${reason}`),
  });

  if (json) {
    console.log(JSON.stringify({ market, volumes: Object.fromEntries(volumes), skipped }, null, 2));
    return;
  }

  console.log(`Exact volumes, ${MARKETS[market].label} (avg monthly searches, last 12 months):`);
  volumes.forEach((group, keyword) => {
    if (group?.avgMonthlySearches == null) {
      console.log(`  ${keyword}: no data`);
      return;
    }
    const others = [group.text, ...group.closeVariants].filter((text) => text.toLowerCase() !== keyword);
    const variants = others.length ? ` (one group with: ${others.join(', ')})` : '';
    console.log(`  ${keyword}: ${group.avgMonthlySearches}/mo, ${group.competition ?? 'n/a'}${variants}`);
  });
  skipped.forEach((line) => console.error(`  skipped ${line}`));
};

try {
  run();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
