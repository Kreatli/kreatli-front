import Head from 'next/head';
import React from 'react';

import { Home } from '../components/review-tool/home/Home';
import { Header } from '../components/review-tool/layout/Header';
import { Projects } from '../components/review-tool/project/Projects';
import { useSession } from '../hooks/review-tool/useSession';

export default function HomePage() {
  const { isSignedIn } = useSession();

  const title = `${isSignedIn ? 'Projects' : 'Review Hub'} | Kreatli`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Header />
      {isSignedIn ? <Projects /> : <Home />}
    </>
  );
}
