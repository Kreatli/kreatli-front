import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { BRAND_NAME, DEFAULT_META_DESCRIPTION } from '../../constants/brand';
import { getAbsoluteUrl } from '../../content/seo/paths';
import { getOgImageUrl } from '../../content/seo/schema';

// Signed-in app screens and token links. They render an empty shell for crawlers, so keep them out
// of the index (noindex rather than robots.txt so crawlers can actually read the directive).
const PRIVATE_ROUTE_PREFIXES = [
  '/activate',
  '/admin',
  '/chat',
  '/dashboard',
  '/jobs',
  '/professionals',
  '/profile',
  '/reset-password',
  '/signup',
];

// Error pages render under whatever URL was requested, so they must not claim it as canonical.
const ERROR_ROUTES = ['/404', '/500', '/_error'];

const isPrivateRoute = (pathname: string) =>
  ERROR_ROUTES.includes(pathname) ||
  PRIVATE_ROUTE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

/**
 * Site-wide defaults. Pages override any of these through PageHead / SeoHead (matching `key`s).
 * The canonical is derived from the current path, which next/router reports without the locale
 * prefix, so /en/... duplicates point back at the clean URL.
 */
export const DefaultHead = () => {
  const router = useRouter();
  const path = router.asPath.split(/[?#]/)[0] || '/';
  const canonical = getAbsoluteUrl(path);
  const isPrivate = isPrivateRoute(router.pathname);

  return (
    <Head>
      <title>{BRAND_NAME}</title>
      <meta name="description" content={DEFAULT_META_DESCRIPTION} key="description" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {isPrivate && <meta name="robots" content="noindex, nofollow" key="robots" />}
      {!isPrivate && <link rel="canonical" href={canonical} key="canonical" />}
      <meta property="og:url" content={canonical} key="og:url" />
      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:title" content={BRAND_NAME} key="og:title" />
      <meta property="og:description" content={DEFAULT_META_DESCRIPTION} key="og:description" />
      <meta property="og:site_name" content={BRAND_NAME} key="og:site_name" />
      <meta property="og:image" content={getOgImageUrl(BRAND_NAME)} key="og:image" />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
    </Head>
  );
};
