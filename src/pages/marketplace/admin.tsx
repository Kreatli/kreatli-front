import Error from 'next/error';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { AdminPanel } from '../../components/marketplace/admin/AdminPanel';
import { useProtectedPage } from '../../hooks/marketplace/useProtectedPage';
import { useSession } from '../../hooks/marketplace/useSession';

const Admin = () => {
  const { currentUser } = useSession();
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  if (currentUser?.role !== 'admin') {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-lg mx-auto px-6">
        <AdminPanel />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Admin;
