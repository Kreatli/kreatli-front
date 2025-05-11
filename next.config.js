const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com', 'kreatlimedia.s3.amazonaws.com'],
  },
  experimental: {
    scrollRestoration: true,
  },
  env: {
    MARKETPLACE_API_URL: process.env.MARKETPLACE_API_URL || 'http://localhost:3010',
    REVIEW_TOOL_API_URL: process.env.REVIEW_TOOL_API_URL || 'http://localhost:3010',
    GTM_ID: process.env.GTM_ID || '',
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
    ENABLE_REDDIT_PIXEL: process.env.ENABLE_REDDIT_PIXEL || 'false',
  },
  productionBrowserSourceMaps: true,
  swcMinify: false,
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
