import { Link } from '@nextui-org/react';
import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { SeoIndexHead } from '../../components/seo';
import { SeoSectionIndex } from '../../components/seo/SeoSectionIndex';
import { SeoPage } from '../../content/seo/types';
import { getPublishedPagesByType } from '../../content/seo/utils';

interface Props {
  pages: SeoPage[];
}

const AlternativesIndexPage = ({ pages }: Props) => (
  <>
    <SeoIndexHead
      section="alternatives"
      title="Clipping Platform Alternatives | Kreatli"
      description="Alternatives to Whop Content Rewards, Vyro and other clipping platforms, compared for clippers who want steadier pay and creators who want more control."
    />
    <SeoSectionIndex
      type="alternatives"
      pages={pages}
      description={
        <>
          Honest overviews of the other ways to earn from clipping or get clips made, and when each one is the better
          fit. Want a team to run it for you? Compare a{' '}
          <Link as={NextLink} href="/compare/clipping-agency-vs-clipping-marketplace" color="secondary" underline="hover">
            clipping agency
          </Link>{' '}
          with a clipping marketplace.
        </>
      }
    />
  </>
);

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    pages: getPublishedPagesByType('alternatives'),
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default AlternativesIndexPage;
