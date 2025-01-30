import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { Connections } from '../../../../components/marketplace/profile/Connections';
import { useProtectedPage } from '../../../../hooks/marketplace/useProtectedPage';
import { useUser } from '../../../../hooks/marketplace/useUser';
import { Common } from '../../../../typings/common';

const ConnectionsPage = () => {
  const router = useRouter();
  const userId = router.query.id as Common.MaybeId;
  const { user } = useUser(userId);
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  const pageTitle = `Connections | ${user?.name ?? ''} | Kreatli`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Connections userId={userId} />
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default ConnectionsPage;
