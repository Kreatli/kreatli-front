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

const HireIndexPage = ({ pages }: Props) => (
  <>
    <SeoIndexHead
      section="hire"
      title="Hire Editors | Kreatli Marketplace"
      description="Hire niche video editors for podcasts, gaming, Shorts, TikTok, and more on Kreatli Marketplace."
    />
    <SeoSectionIndex
      type="hire"
      pages={pages}
      description="Find and hire specialized clip editors for your content niche."
    />
  </>
);

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    pages: getPublishedPagesByType('hire'),
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default HireIndexPage;
