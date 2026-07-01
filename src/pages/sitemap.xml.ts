import { GetServerSideProps } from 'next';

import { SEO_PAGES } from '../content/seo/registry';
import { getPageUrl, SITE_URL, STATIC_SITE_PATHS } from '../content/seo/utils';

const generateSitemap = () => {
  const publishedSeoPaths = SEO_PAGES.filter((page) => page.status === 'published').map((page) => getPageUrl(page.type, page.slug));

  const allPaths = [...STATIC_SITE_PATHS, ...publishedSeoPaths];
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = allPaths
    .map(
      (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.7'}</priority>
  </url>`,
    )
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
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
