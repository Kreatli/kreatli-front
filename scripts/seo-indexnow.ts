/**
 * Tells Bing and Yandex about new and changed marketplace.kreatli.com pages through IndexNow (SEO-43). Google
 * doesn't use IndexNow; it gets the "Request indexing" list in the writer's report instead.
 *
 * Dry run by default: prints what would be sent. Add --submit to send. Before sending, the script checks that the
 * live key file returns the key; if it doesn't, the engines would answer 403, so nothing is sent.
 *
 * Usage:
 *   npm run seo:indexnow -- /guides/what-is-a-clipper /clipping-jobs
 *   npm run seo:indexnow -- --changed-since 2026-11-19          # SEO pages published or updated since then
 *   npm run seo:indexnow -- --changed-since 2026-11-19 --submit
 *
 * Submit only live pages that changed. Pinging unchanged URLs again and again can get the key throttled.
 * The key is public by design (it only proves we own the site): public/<key>.txt. It is this site's own key;
 * never reuse kreatli.com's.
 */

import { getPageUrl, SITE_URL } from '../src/content/seo/paths';
import { SEO_PAGES } from '../src/content/seo/registry';

export const INDEXNOW_KEY = '379261fdcb0dcbf2e5a3cf207855594c';

const HOST = new URL(SITE_URL).host;
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
// Submitting to one engine shares the URLs with the others, but Bing and Yandex both get them directly.
const ENDPOINTS = ['https://www.bing.com/indexnow', 'https://yandex.com/indexnow'];
const MAX_URLS_PER_REQUEST = 10_000;
const TIMEOUT_MS = 30_000;

const STATUS: Record<number, string> = {
  200: 'OK',
  202: 'Accepted (key check pending)',
  400: 'Bad request',
  403: 'Key not valid (key file missing or wrong)',
  422: 'URLs not on this host, or key mismatch',
  429: 'Too many requests',
};

interface Options {
  submit: boolean;
  changedSince: string | null;
  inputs: string[];
}

const parseArgs = (): Options => {
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  const options: Options = { submit: false, changedSince: null, inputs: [] };
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--submit') options.submit = true;
    else if (args[i] === '--changed-since') {
      i += 1;
      options.changedSince = args[i] ?? '';
    } else if (args[i].startsWith('--')) throw new Error(`Unknown option ${args[i]}`);
    else options.inputs.push(args[i]);
  }
  if (options.changedSince !== null && !/^\d{4}-\d{2}-\d{2}$/.test(options.changedSince)) {
    throw new Error('--changed-since needs a date like 2026-11-19');
  }
  return options;
};

/** Paths or marketplace URLs to absolute marketplace URLs; anything on another host is rejected. */
const normalize = (inputs: string[]) => {
  const urls = new Set<string>();
  const rejected: string[] = [];
  inputs.forEach((input) => {
    const value = input.trim();
    if (!value) return;
    try {
      const url = new URL(value, SITE_URL);
      if (url.host !== HOST) throw new Error('other host');
      const pathname = url.pathname.replace(/\/$/, '') || '/';
      urls.add(`${SITE_URL}${pathname}`);
    } catch {
      rejected.push(value);
    }
  });
  return { urls: Array.from(urls), rejected };
};

/** Published SEO pages whose last change (updatedAt, else publishedAt, as in the audit) is on or after `date`. */
const changedSince = (date: string) =>
  SEO_PAGES.filter((page) => page.status === 'published')
    .filter((page) => (page.updatedAt ?? page.publishedAt ?? '') >= date)
    .map((page) => getPageUrl(page.type, page.slug));

const keyFileIsLive = async () => {
  try {
    const response = await fetch(KEY_LOCATION, { redirect: 'manual', signal: AbortSignal.timeout(TIMEOUT_MS) });
    const body = (await response.text()).trim();
    if (response.status === 200 && body === INDEXNOW_KEY) return true;
    console.error(
      `Key file ${KEY_LOCATION} returned ${response.status}${response.status === 200 ? ' without the key' : ''}.`,
    );
  } catch (error) {
    console.error(`Couldn't fetch ${KEY_LOCATION}: ${error instanceof Error ? error.message : error}`);
  }
  return false;
};

const submit = async (endpoint: string, urlList: string[]) => {
  const engine = new URL(endpoint).host;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: INDEXNOW_KEY, keyLocation: KEY_LOCATION, urlList }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    console.log(`${engine}: ${response.status} ${STATUS[response.status] ?? ''} (${urlList.length} URLs)`);
    if (response.status !== 200 && response.status !== 202) {
      process.exitCode = 1;
      const text = await response.text().catch(() => '');
      if (text) console.error(text.slice(0, 300));
    }
  } catch (error) {
    process.exitCode = 1;
    console.error(`${engine}: ${error instanceof Error ? error.message : error}`);
  }
};

const run = async () => {
  const options = parseArgs();
  const inputs = [...options.inputs, ...(options.changedSince ? changedSince(options.changedSince) : [])];
  const { urls, rejected } = normalize(inputs);
  if (rejected.length) console.error(`Skipped ${rejected.length} input(s) not on ${SITE_URL}: ${rejected.join(', ')}`);
  if (!urls.length) {
    console.log(
      options.changedSince
        ? `No pages changed since ${options.changedSince}.`
        : 'No URLs. Pass paths or --changed-since <date>.',
    );
    return;
  }

  const batches: string[][] = [];
  for (let i = 0; i < urls.length; i += MAX_URLS_PER_REQUEST) batches.push(urls.slice(i, i + MAX_URLS_PER_REQUEST));
  console.log(`${urls.length} URL(s) for ${ENDPOINTS.map((e) => new URL(e).host).join(' and ')}:`);
  urls.forEach((url) => console.log(`  ${url}`));

  if (!options.submit) {
    console.log('\nDry run. Add --submit to send.');
    return;
  }
  if (!(await keyFileIsLive())) {
    console.error('Not submitting: the key file must be live on production first.');
    process.exitCode = 1;
    return;
  }

  // One request at a time, so the engines see a single client and the log stays in order.
  const requests = ENDPOINTS.flatMap((endpoint) => batches.map((urlList) => ({ endpoint, urlList })));
  await requests.reduce(
    (previous, { endpoint, urlList }) => previous.then(() => submit(endpoint, urlList)),
    Promise.resolve(),
  );
};

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
