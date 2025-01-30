import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { Header } from '../../../../components/review-tool/layout/Header';
import { useProtectedPage } from '../../../../hooks/review-tool/useProtectedPage';

export default function ProjectAssetsPage() {
  const { isSignedIn } = useProtectedPage();
  const router = useRouter();

  if (!isSignedIn || !router.query.fileId) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="description" content="Kreatli" />
      </Head>
      <Header />
      File page {router.query.fileId}
    </>
  );
}
