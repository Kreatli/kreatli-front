import Head from 'next/head';
import React from 'react';

import { ProjectLayout } from '../../../components/review-tool/project/Project';
import { useProtectedPage } from '../../../hooks/review-tool/useProtectedPage';

export default function ProjectChat() {
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      Chat
    </>
  );
}

ProjectChat.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
