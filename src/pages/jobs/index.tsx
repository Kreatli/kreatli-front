import Head from 'next/head';
import React from 'react';

import { JobsListing } from '../../components/jobs/JobsListing';
import { useProtectedPage } from '../../hooks/useProtectedPage';

const Jobs = () => {
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Job postings | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-xl mx-auto px-6">
        <JobsListing />
      </div>
    </>
  );
};

export default Jobs;
