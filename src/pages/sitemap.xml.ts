import { GetServerSideProps } from 'next';

import { SEO_PAGES } from '../content/seo/registry';
import { getAbsoluteUrl, getPageUrl, STATIC_SITE_PATHS } from '../content/seo/utils';

interface SitemapEntry {
  path: string;
  lastmod?: string;
}

const generateSitemap = () => {
  const seoEntries: SitemapEntry[] = SEO_PAGES.filter((page) => page.status === 'published').map((page) => ({
    path: getPageUrl(page.type, page.slug),
    lastmod: page.updatedAt ?? page.publishedAt,
  }));

  const entries: SitemapEntry[] = [...STATIC_SITE_PATHS.map((path) => ({ path })), ...seoEntries];

  // lastmod is only emitted when we know the real content date; a date that changes on every
  // request tells search engines nothing.
  const urls = entries
    .map(({ path, lastmod }) =>
      [
        '  <url>',
        `    <loc>${getAbsoluteUrl(path)}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        '  </url>',
      ].join('\n'))
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSitemap();

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
