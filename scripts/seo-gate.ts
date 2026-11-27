/**
 * The writer's pre-push gate (SEO-39): builds the site, starts the production server on its own port, runs
 * `seo:qa` (including the on-page check on the rendered page) for the given pages, then stops the server.
 * Exits with seo:qa's code, so a new must-fix finding stops the commit.
 *
 * Usage:
 *   npm run seo:gate -- hire/hire-a-kick-clipper                 # the page(s) this ticket changed
 *   npm run seo:gate -- hire/hire-a-kick-clipper --all           # plus every published page
 *   npm run seo:gate -- hire/hire-a-kick-clipper --skip-build    # reuse a build you just made
 *   npm run seo:gate -- /clipping-jobs --all                     # an app page with targets
 */

import { ChildProcess, spawn, spawnSync } from 'child_process';

const PORT = Number(process.env.SEO_GATE_PORT ?? 3100);
const BASE = `http://localhost:${PORT}`;
const START_TIMEOUT_MS = 90_000;

const waitForServer = async () => {
  const deadline = Date.now() + START_TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const response = await fetch(`${BASE}/`, { signal: AbortSignal.timeout(5_000) });
      if (response.status < 500) return;
    } catch {
      // Not up yet.
    }
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => {
      setTimeout(resolve, 1_000);
    });
  }
  throw new Error(`The production server didn't answer on ${BASE} within ${START_TIMEOUT_MS / 1000}s.`);
};

const run = async () => {
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  const skipBuild = args.includes('--skip-build');
  const checkAll = args.includes('--all');
  const pages = args.filter((arg) => !arg.startsWith('--'));
  if (!pages.length) throw new Error('Name the page(s) to check, e.g. npm run seo:gate -- hire/hire-a-kick-clipper');

  if (!skipBuild) {
    console.log('Building (npm run build)...');
    const build = spawnSync('npm', ['run', 'build'], { stdio: ['ignore', 'ignore', 'inherit'] });
    if (build.status !== 0) throw new Error('The build failed. Fix it before anything else.');
  }

  console.log(`Starting the production server on ${BASE}...`);
  const server: ChildProcess = spawn('npx', ['next', 'start', '-p', String(PORT)], { stdio: 'ignore', detached: true });
  const stop = () => {
    try {
      if (server.pid) process.kill(-server.pid);
    } catch {
      // Already stopped.
    }
  };
  process.on('exit', stop);

  try {
    await waitForServer();
    const qa = spawnSync('npx', ['tsx', 'scripts/seo-qa.ts', ...pages, '--base', BASE], { stdio: 'inherit' });
    let status = qa.status ?? 1;
    if (checkAll) {
      console.log('\nEvery published page:');
      const all = spawnSync('npx', ['tsx', 'scripts/seo-qa.ts', '--all', '--base', BASE], { stdio: 'inherit' });
      status = Math.max(status, all.status ?? 1);
    }
    console.log(`\nGate: ${status === 0 ? 'PASS' : 'FAIL'}`);
    process.exitCode = status;
  } finally {
    stop();
  }
};

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
