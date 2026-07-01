import React from 'react';

import { SeoContentPage } from '../../components/seo/SeoContentPage';
import { createSeoStaticPaths, createSeoStaticProps } from '../../content/seo/pageProps';
import { SeoPage, SeoPageWithBody } from '../../content/seo/types';

interface Props {
  page: SeoPageWithBody;
  relatedPages: SeoPage[];
}

const HirePage = ({ page, relatedPages }: Props) => <SeoContentPage page={page} relatedPages={relatedPages} />;

export const getStaticPaths = createSeoStaticPaths('hire');
export const getStaticProps = createSeoStaticProps('hire');

export default HirePage;
