import { GetServerSideProps } from "next";

const siteUrl = "https://kreatli.com";

const staticRoutes = [
  "/",
  "/blog",
  "/faq",
  "/contact",
  "/jobs",
  "/professionals",
];
const blogPostSlugs = [
  "getting-started-as-a-clipper",
  "how-to-find-the-perfect-clipper",
  "clipping-best-practices",
  "building-your-clipper-portfolio",
];

const buildSitemap = () => {
  const urls = [
    ...staticRoutes.map((path) => `${siteUrl}${path}`),
    ...blogPostSlugs.map((slug) => `${siteUrl}/blog/${slug}`),
  ];

  const lastmod = new Date().toISOString();

  const urlEntries = urls
    .map(
      (url) => `<url>
  <loc>${url}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>${url === siteUrl ? "1.0" : "0.8"}</priority>
</url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = buildSitemap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

const SiteMap = () => null;

export default SiteMap;
