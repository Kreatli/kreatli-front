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

const GlossaryIndexPage = ({ pages }: Props) => (
  <>
    <SeoIndexHead
      section="glossary"
      title="Glossary | Kreatli Marketplace"
      description="Definitions for clipping, short-form video, and freelance marketplace terms."
    />
    <SeoSectionIndex
      type="glossary"
      pages={pages}
      description="Clear definitions for clipping and video editing terminology."
    />
  </>
);

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    pages: getPublishedPagesByType('glossary'),
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default GlossaryIndexPage;
