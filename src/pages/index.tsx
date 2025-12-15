import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { Feed } from '../components/feed/Feed';
import { Home } from '../components/home/Home';
import { useSession } from '../hooks/useSession';

export default function HomePage() {
  const { isSignedIn } = useSession();

  return (
    <>
      <Head>
        <title>Clipper Marketplace for YouTube Creators | Kreatli</title>
        <meta name="description" content="Connect with skilled clippers on Kreatli. Post clipping campaigns or browse clipper services. The premier marketplace for video clip creation." />
      </Head>
      {isSignedIn ? <Feed /> : <Home />}
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'signIn', 'signUp'])),
    },
  };
}
