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

const CompareIndexPage = ({ pages }: Props) => (
  <>
    <SeoIndexHead
      section="compare"
      title="Compare | Kreatli Marketplace"
      description="Compare Kreatli Marketplace with Fiverr, Upwork, AI clipping tools, and other ways to hire video editors."
    />
    <SeoSectionIndex
      type="compare"
      pages={pages}
      description="Side-by-side comparisons to help creators and clippers choose the right marketplace."
    />
  </>
);

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    pages: getPublishedPagesByType('compare'),
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default CompareIndexPage;
