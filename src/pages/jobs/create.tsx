import Error from 'next/error';
import Head from 'next/head';
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
        <title>Create a job posting | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-lg mx-auto px-6">
        <JobsCreation />
      </div>
    </>
  );
};

export default JobsCreate;
