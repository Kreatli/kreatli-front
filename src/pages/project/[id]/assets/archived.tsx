import Head from 'next/head';
import React from 'react';

import { ProjectLayout } from '../../../../components/review-tool/project/Project';
import { ProjectArchivedAssets } from '../../../../components/review-tool/project/ProjectAssets';

export default function ProjectAssetsPage() {
  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      <ProjectArchivedAssets />
    </>
  );
}

ProjectAssetsPage.getLayout = (page: any) => <ProjectLayout hideHeader>{page}</ProjectLayout>;
