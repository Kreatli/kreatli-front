import Head from 'next/head';
import React from 'react';

import { BRAND_NAME } from '../../constants/brand';
import { getAbsoluteUrl } from '../../content/seo/paths';
import { getOgImageUrl } from '../../content/seo/schema';

type JsonLd = Record<string, unknown>;

interface Props {
  /** Full <title>, already including the brand if wanted (see getPageTitle). */
  title: string;
  description: string;
  /** Canonical path. Falls back to the site-wide default canonical from DefaultHead. */
  path?: string;
  ogType?: 'website' | 'article';
  /** Text rendered on the generated social image; defaults to the title. */
  ogImageTitle?: string;
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
}

export const PageHead = ({ title, description, path, ogType = 'website', ogImageTitle, noindex, jsonLd }: Props) => {
  const canonical = path ? getAbsoluteUrl(path) : undefined;
  const image = getOgImageUrl(ogImageTitle ?? title);
  const schemas = jsonLd ? ([] as JsonLd[]).concat(jsonLd) : [];

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      {noindex && <meta name="robots" content="noindex, follow" key="robots" />}
      {canonical && <link rel="canonical" href={canonical} key="canonical" />}
      {canonical && <meta property="og:url" content={canonical} key="og:url" />}
      <meta property="og:type" content={ogType} key="og:type" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:site_name" content={BRAND_NAME} key="og:site_name" />
      <meta property="og:image" content={image} key="og:image" />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={image} key="twitter:image" />
      {schemas.map((schema, index) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={`jsonld-${index}`}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
};
