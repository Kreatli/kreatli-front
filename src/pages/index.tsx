import Head from 'next/head';
import React from 'react';

import { Feed } from '../components/feed/Feed';
import { Hero } from '../components/home/Hero';
import { useSession } from '../hooks/useSession';

export default function Home() {
  const { isSignedIn } = useSession();

  return (
    <>
      <Head>
        <title>Home | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      {isSignedIn ? <Feed /> : <Hero />}
    </>
  );
}
