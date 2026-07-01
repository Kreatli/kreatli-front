import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { ProfessionalListing } from '../components/professionals/ProfessionalListing';
import { useProtectedPage } from '../hooks/useProtectedPage';

const Professionals = () => {
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Professionals | Kreatli Marketplace</title>
        <meta name="description" content="Kreatli Marketplace" />
      </Head>
      <div className="container max-w-screen-xl mx-auto px-6">
        <ProfessionalListing />
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

export default Professionals;
