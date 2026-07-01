import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { Dashboard } from '../components/dashboard/Dashboard';
import { useProtectedPage } from '../hooks/useProtectedPage';

const DashboardPage = () => {
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard | Kreatli Marketplace</title>
        <meta name="description" content="Kreatli Marketplace" />
      </Head>
      <div className="container max-w-screen-xl mx-auto px-6">
        <Dashboard />
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

export default DashboardPage;
