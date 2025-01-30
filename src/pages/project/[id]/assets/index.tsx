import Head from 'next/head';
import React from 'react';

import { ProjectLayout } from '../../../../components/review-tool/project/Project';
import { ProjectAssets } from '../../../../components/review-tool/project/ProjectAssets';
import { useProtectedPage } from '../../../../hooks/review-tool/useProtectedPage';

export default function ProjectAssetsPage() {
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

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
