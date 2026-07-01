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
      title="Guides | Kreatli"
      description="How-to guides for hiring video editors and building a clipping career on Kreatli."
    />
    <SeoSectionIndex
      type="guide"
      pages={pages}
      description="Practical guides for creators hiring editors and clippers growing their careers."
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
