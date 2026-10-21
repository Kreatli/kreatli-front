import React from 'react';

import { SeoContentPage } from '../../components/seo/SeoContentPage';
import { createSeoStaticPaths, createSeoStaticProps } from '../../content/seo/pageProps';
import { SeoPage, SeoPageWithBody } from '../../content/seo/types';

interface Props {
  page: SeoPageWithBody;
  relatedPages: SeoPage[];
}

const AlternativesPage = ({ page, relatedPages }: Props) => <SeoContentPage page={page} relatedPages={relatedPages} />;

export const getStaticPaths = createSeoStaticPaths('alternatives');
export const getStaticProps = createSeoStaticProps('alternatives');

export default AlternativesPage;
