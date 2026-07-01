import React from 'react';

import { SeoPage, SeoPageType, SeoPageWithBody } from '../../content/seo/types';
import {
  ContentBody,
  ContentCta,
  ContentPageLayout,
  HirePageCta,
  RelatedPages,
  SeoHead,
} from '.';

interface Props {
  page: SeoPageWithBody;
  relatedPages: SeoPage[];
}

export const SeoContentPage = ({ page, relatedPages }: Props) => (
  <>
    <SeoHead page={page} />
    <ContentPageLayout
      type={page.type}
      slug={page.slug}
      title={page.title}
      funnelSide={page.funnelSide}
      readTimeMinutes={page.readTimeMinutes}
    >
      <ContentBody html={page.body} />
      {page.type === 'hire' ? <HirePageCta page={page} /> : <ContentCta type={page.type} funnelSide={page.funnelSide} />}
      <RelatedPages pages={relatedPages} />
    </ContentPageLayout>
  </>
);

export type { SeoPageType };
