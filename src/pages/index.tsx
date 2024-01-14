import Head from 'next/head';
import React from 'react';

import { Feed } from '../components/feed/Feed';
import { Home } from '../components/home/Home';
import { useSession } from '../hooks/useSession';

export default function HomePage() {
  const { isSignedIn } = useSession();

  return (
    <>
      <Head>
        <title>Home | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      {isSignedIn ? <Feed /> : <Home />}
    </>
  );
}
