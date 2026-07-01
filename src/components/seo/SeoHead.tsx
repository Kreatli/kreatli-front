import Head from 'next/head';
import React from 'react';

import { SeoPage, SeoPageType } from '../../content/seo/types';
import { getPageUrl, SITE_URL } from '../../content/seo/utils';

interface Props {
  page: SeoPage;
  pathOverride?: string;
}

const getJsonLd = (page: SeoPage, url: string) => {
  if (page.type === 'glossary') {
    return {
      '@context': 'https://schema.org',
      '@type': 'DefinedTerm',
      name: page.title,
      description: page.metaDescription,
      url,
    };
  }

  if (page.type === 'hire') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.metaDescription,
      url,
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.metaDescription,
    url,
    keywords: page.primaryKeyword,
  };
};

export const SeoHead = ({ page, pathOverride }: Props) => {
  const path = pathOverride ?? getPageUrl(page.type, page.slug);
  const canonical = `${SITE_URL}${path}`;
  const title = `${page.title} | Kreatli`;
  const jsonLd = getJsonLd(page, canonical);

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={page.metaDescription} />
      <meta name="keywords" content={page.primaryKeyword} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={page.metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Kreatli" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={page.metaDescription} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};

export const SeoIndexHead = ({
  section,
  title,
  description,
}: {
  section: SeoPageType;
  title: string;
  description: string;
}) => {
  const path = section === 'guide' ? '/guides' : `/${section}`;
  const canonical = `${SITE_URL}${path}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
    </Head>
  );
};
