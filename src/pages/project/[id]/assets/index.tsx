import Head from 'next/head';
import React from 'react';

import { ProjectLayout } from '../../../../components/review-tool/project/Project';
import { ProjectAssets } from '../../../../components/review-tool/project/ProjectAssets';

export default function ProjectAssetsPage() {
  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      <ProjectAssets />
    </>
  );
}

ProjectAssetsPage.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
