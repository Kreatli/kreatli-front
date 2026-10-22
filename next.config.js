const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
  env: {
    API_URL: process.env.API_URL,
    GTM_ID: process.env.GTM_ID,
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    ENABLE_REDDIT_PIXEL: process.env.ENABLE_REDDIT_PIXEL,
  },
  async redirects() {
    // Slugs renamed from "video editor" to "clipper" wording (Oct 2026), before any of them were indexed.
    const renamedSlugs = [
      ['/hire/hire-a-twitch-vod-editor', '/hire/hire-a-twitch-clipper'],
      ['/hire/hire-a-podcast-clip-editor', '/hire/hire-a-podcast-clipper'],
      ['/hire/hire-a-youtube-shorts-editor', '/hire/hire-a-youtube-clipper'],
      ['/hire/hire-a-gaming-highlight-editor', '/hire/hire-a-gaming-clipper'],
      ['/hire/hire-a-tiktok-editor', '/hire/hire-a-tiktok-clipper'],
      ['/hire/hire-an-instagram-reels-editor', '/hire/hire-an-instagram-reels-clipper'],
      ['/hire/hire-a-livestream-editor', '/hire/hire-a-stream-clipper'],
      ['/guides/vet-a-freelance-video-editor', '/guides/how-to-vet-a-clipper'],
      ['/guides/how-to-write-a-video-editing-job-post', '/guides/how-to-write-a-clipper-job-post'],
      ['/guides/how-to-brief-a-video-editor', '/guides/how-to-brief-a-clipper'],
      ['/guides/find-a-tiktok-editor', '/guides/how-to-find-a-tiktok-clipper'],
      ['/guides/fiverr-vs-upwork-for-video-editors', '/guides/fiverr-vs-upwork-for-clippers'],
      ['/compare/kreatli-vs-video-editing-agency', '/compare/clipping-agency-vs-clipping-marketplace'],
      ['/compare/kreatli-vs-hiring-in-house-editor', '/compare/freelance-clipper-vs-in-house-editor'],
    ];

    // Pages merged into stronger guides (kept as permanent redirects so old links and bookmarks still work).
    return [
      ...renamedSlugs.map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: '/guides/cost-to-hire-a-video-editor', destination: '/guides/how-much-to-pay-clippers', permanent: true },
      { source: '/blog/getting-started-as-a-clipper', destination: '/guides/how-to-become-a-clipper', permanent: true },
      { source: '/blog/how-to-find-the-perfect-clipper', destination: '/guides/how-to-hire-a-clipper', permanent: true },
      {
        source: '/blog/building-your-clipper-portfolio',
        destination: '/guides/video-editing-portfolio-no-clients',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
