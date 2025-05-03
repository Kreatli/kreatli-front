import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectLayout } from '../../../../../components/review-tool/project/Project';
import { ProjectFolderAssets } from '../../../../../components/review-tool/project/ProjectAssets/ProjectFolderAssets';

export default function ProjectAssetsPage() {
  const router = useRouter();

  if (!router.query.folderId) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      <ProjectFolderAssets folderId={router.query.folderId as string} />
    </>
  );
}

ProjectAssetsPage.getLayout = (page: any) => <ProjectLayout hideHeader>{page}</ProjectLayout>;
