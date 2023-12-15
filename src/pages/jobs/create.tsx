import { useSession } from 'hooks/useSession';
import Error from 'next/error';
import Head from 'next/head';
import React from 'react';

import { JobsCreation } from '../../components/jobs/JobCreation';

const JobsCreate = () => {
  const { currentUser } = useSession();

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
