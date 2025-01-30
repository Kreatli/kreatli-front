import Head from 'next/head';
import React from 'react';

import { Header } from '../components/review-tool/layout/Header';
import { Projects } from '../components/review-tool/project/Projects';
import { useProtectedPage } from '../hooks/review-tool/useProtectedPage';

export default function ProjectsPage() {
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Projects | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Header />
      <Projects />
    </>
  );
}
