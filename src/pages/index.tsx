import Head from 'next/head';
import React from 'react';

import { Hero } from '../components/home/Hero';
import { useSession } from '../hooks/useSession';
import { Feed } from '../components/feed/Feed';

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
