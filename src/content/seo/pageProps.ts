import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { loadPublishedPage } from './loadPage';
import { SeoPage, SeoPageType, SeoPageWithBody } from './types';
import { getPublishedPagesByType, getRelatedPages } from './utils';

export const createSeoStaticPaths = (type: SeoPageType): GetStaticPaths => () => ({
  paths: getPublishedPagesByType(type).map((page) => ({
    params: { slug: page.slug },
  })),
  fallback: false,
});

interface SeoPageProps {
  page: SeoPageWithBody;
  relatedPages: SeoPage[];
}

export const createSeoStaticProps = (type: SeoPageType): GetStaticProps<SeoPageProps> =>
  async ({ params, locale }) => {
    const slug = params?.slug as string;
    const page = loadPublishedPage(type, slug);

    if (!page) {
      return { notFound: true };
    }

    return {
      props: {
        page,
        relatedPages: getRelatedPages(page),
        ...(await serverSideTranslations(locale ?? 'en', ['common', 'signIn', 'signUp'])),
      },
    };
  };
