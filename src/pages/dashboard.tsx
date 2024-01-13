import Head from 'next/head';
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
        <title>Dashboard | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-xl mx-auto px-6">
        <Dashboard />
      </div>
    </>
  );
};

export default DashboardPage;
