import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectLayout } from '../../../../../components/review-tool/project/Project';
import { ProjectFolderAssets } from '../../../../../components/review-tool/project/ProjectAssets/ProjectFolderAssets';
import { FolderContextProvider } from '../../../../../contexts/review-tool/Folder';
import { useProtectedPage } from '../../../../../hooks/review-tool/useProtectedPage';

export default function ProjectAssetsPage() {
  const { isSignedIn } = useProtectedPage();
  const router = useRouter();

  if (!isSignedIn || !router.query.folderId) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      <FolderContextProvider>
        <ProjectFolderAssets folderId={router.query.folderId as string} />
      </FolderContextProvider>
    </>
  );
}

ProjectAssetsPage.getLayout = (page: any) => <ProjectLayout hideHeader>{page}</ProjectLayout>;
