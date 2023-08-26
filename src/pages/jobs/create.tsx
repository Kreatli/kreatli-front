import Head from 'next/head';
import React from 'react';

import { JobsCreation } from '../../components/jobs/JobCreation';

const JobsCreate = () => {
  return (
    <>
      <Head>
        <title>Create job posting | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-lg mx-auto px-6">
        <JobsCreation />
      </div>
    </>
  );
};

export default JobsCreate;
