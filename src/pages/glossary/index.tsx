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
      title="Clipping and Short-Form Video Glossary | Kreatli"
      description="Plain-English definitions of clipping terms: CPM, clipping campaigns, payout caps, verified views, hooks, jump cuts, 9:16 video and more."
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
