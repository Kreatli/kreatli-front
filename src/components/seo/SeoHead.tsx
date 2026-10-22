import React from 'react';

import { getPageTitle } from '../../constants/brand';
import { breadcrumbSchema, getSeoPageSchemas } from '../../content/seo/schema';
import { SEO_SECTION_LABELS, SeoFaq, SeoPage, SeoPageType } from '../../content/seo/types';
import { getPageUrl, SEO_SECTION_PATHS } from '../../content/seo/utils';
import { PageHead } from './PageHead';

interface Props {
  page: SeoPage;
  faqs?: SeoFaq[];
}

export const SeoHead = ({ page, faqs }: Props) => (
  <PageHead
    title={getPageTitle(page.seoTitle ?? page.title)}
    description={page.metaDescription}
    path={getPageUrl(page.type, page.slug)}
    ogType="article"
    ogImageTitle={page.title}
    jsonLd={getSeoPageSchemas(page, faqs)}
  />
);

export const SeoIndexHead = ({
  section,
  title,
  description,
}: {
  section: SeoPageType;
  title: string;
  description: string;
}) => {
  const path = SEO_SECTION_PATHS[section];

  return (
    <PageHead
      title={title}
      description={description}
      path={path}
      jsonLd={breadcrumbSchema([{ name: SEO_SECTION_LABELS[section], path }])}
    />
  );
};
