import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { Feed } from '../../components/marketplace/feed/Feed';
import { Home } from '../../components/marketplace/home/Home';
import { useSession } from '../../hooks/marketplace/useSession';

export default function HomePage() {
  const { isSignedIn } = useSession();

  return (
    <>
      <Head>
        <title>Professional social media platform for YouTube | Kreatli</title>
        <meta name="description" content="Kreatli" />
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
