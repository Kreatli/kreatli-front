import Error from 'next/error';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { JobsCreation } from '../../components/jobs/JobCreation';
import { useProtectedPage } from '../../hooks/useProtectedPage';
import { useSession } from '../../hooks/useSession';

const JobsCreate = () => {
  const { currentUser } = useSession();
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  if (currentUser?.role === 'professional') {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>Create a job posting | Kreatli Marketplace</title>
        <meta name="description" content="Kreatli Marketplace" />
      </Head>
      <div className="container max-w-screen-lg mx-auto px-6">
        <JobsCreation />
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

export default JobsCreate;
