/**
 * On-page SEO check for marketplace.kreatli.com (SEO-39, ported from kreatli.com's KRE-77 check). Read-only.
 *
 * For each registry page with `targets` (src/content/seo/registry.ts) it checks that the target searches sit where Google
 * and readers look: the title, H1, opening answer, meta description and headings. It also checks that the page
 * answers its target questions and doesn't compete with another of our pages.
 *
 * Usage:
 *   npm run seo:onpage                                         # production, every page with targets
 *   npm run seo:onpage -- /hire/hire-a-kick-clipper            # one or more pages
 *   npm run seo:onpage -- --base http://localhost:3000         # local build or dev server
 *   npm run seo:onpage -- --gsc                                # adds cannibalization and uncovered queries (Composio)
 *   npm run seo:onpage -- --links                              # adds incoming links (crawls the sitemap)
 *   npm run seo:onpage -- --gsc --links --update-baseline      # rewrite scripts/onpage/onpage-baseline.json
 *   npm run seo:onpage -- --json report.json
 *
 * Exit code 1 when a must-fix finding is neither in the baseline nor an approved exception (the page's
 * `targets.exceptions`). `seo:qa` runs the same check on every page that has targets.
 */
import fs from 'node:fs';
import path from 'node:path';

import { BASELINE_FILE, classify, PRODUCTION, readBaseline, runOnpage, writeBaseline } from './run.mjs';

const parseArgs = () => {
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  const options = { base: PRODUCTION, paths: [], gsc: false, links: false, json: null, updateBaseline: false };
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--base') options.base = args[++i].replace(/\/$/, '');
    else if (arg === '--gsc') options.gsc = true;
    else if (arg === '--links') options.links = true;
    else if (arg === '--json') options.json = args[++i];
    else if (arg === '--update-baseline') options.updateBaseline = true;
    else if (arg.startsWith('--')) throw new Error(`Unknown option ${arg}`);
    else options.paths.push(arg.startsWith('http') ? new URL(arg).pathname.replace(/\/$/, '') || '/' : arg);
  }
  return options;
};

const ICON = { must: 'x', warn: '!', info: '.' };

const run = async () => {
  const options = parseArgs();
  const baseline = readBaseline();
  console.log(
    `On-page SEO check on ${options.base}${options.base === PRODUCTION ? '' : ' (noindex allowed: not production)'}`,
  );

  const { results, missing, gscWindow } = await runOnpage({ ...options, log: (line) => console.log(line) });
  missing.forEach((pagePath) =>
    console.log(`\n${pagePath}: no targets. Add them to its entry in src/content/seo/registry.ts first.`),
  );

  let failing = 0;
  const totals = { must: 0, warn: 0, info: 0 };
  results.forEach(({ path: pagePath, findings, notes }) => {
    const live = findings.filter((f) => !f.excepted);
    const count = (severity) => live.filter((f) => f.severity === severity).length;
    Object.keys(totals).forEach((severity) => (totals[severity] += count(severity)));
    console.log(`\n== ${pagePath}  must-fix ${count('must')} | warnings ${count('warn')} | info ${count('info')}`);
    notes.forEach((note) => console.log(`   ${note.text}`));
    ['must', 'warn', 'info'].forEach((severity) => {
      findings
        .filter((f) => f.severity === severity)
        .forEach((f) => {
          const state = classify(f, baseline);
          if (severity === 'must' && state === 'new') failing += 1;
          const tag = severity === 'info' ? '' : `  (${state === 'new' ? 'NEW' : state})`;
          console.log(`  ${ICON[severity]} [${f.group}/${f.rule}] ${f.message}${tag}`);
          console.log(`      -> ${f.excepted ? `Exception: ${f.excepted}` : f.fix}`);
        });
    });
  });

  if (options.json) {
    const report = {
      base: options.base,
      generatedAt: new Date().toISOString(),
      gscWindow,
      results: results.map(({ path: p, findings, notes }) => ({ path: p, notes, findings })),
    };
    fs.writeFileSync(options.json, `${JSON.stringify(report, null, 2)}\n`);
    console.log(`\nJSON: ${options.json}`);
  }

  console.log(`\n${results.length} pages: ${totals.must} must-fix, ${totals.warn} warnings, ${totals.info} info.`);
  if (options.updateBaseline) {
    const count = writeBaseline(
      results.flatMap((r) => r.findings),
      options.base,
    );
    console.log(`Baseline written: ${count} known findings -> ${path.relative(process.cwd(), BASELINE_FILE)}`);
    return;
  }
  console.log(`${failing === 0 ? 'PASS' : 'FAIL'}: ${failing} new must-fix finding(s).`);
  if (failing > 0) process.exitCode = 1;
};

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
