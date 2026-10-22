import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { SeoIndexHead } from '../../components/seo';
import { SeoSectionIndex } from '../../components/seo/SeoSectionIndex';
import { SeoPage } from '../../content/seo/types';
import { getPublishedPagesByType } from '../../content/seo/utils';

interface Props {
  pages: SeoPage[];
}

const GuidesIndexPage = ({ pages }: Props) => (
  <>
    <SeoIndexHead
      section="guide"
      title="Clipping Guides for Creators and Clippers | Kreatli"
      description="How to hire clippers, what to pay them, and how to become a clipper and get paid to clip streams and videos. Practical guides from Kreatli Marketplace."
    />
    <SeoSectionIndex
      type="guide"
      pages={pages}
      description="Practical guides for creators hiring clippers and for clippers growing their careers."
    />
  </>
);

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    pages: getPublishedPagesByType('guide'),
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default GuidesIndexPage;
