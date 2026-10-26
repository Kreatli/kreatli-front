/** Permanent redirects from next.config.js (renamed slugs and merged pages), keyed by old path. */
export const loadRedirects = async (): Promise<Map<string, string>> => {
  // next.config.js is CommonJS and only exists as .js, so require it directly.
  // eslint-disable-next-line global-require, import/extensions, @typescript-eslint/no-var-requires
  const nextConfig = require('../../next.config.js');
  const redirects: { source: string; destination: string }[] = nextConfig.redirects ? await nextConfig.redirects() : [];

  return new Map(redirects.map((redirect) => [redirect.source, redirect.destination]));
};
