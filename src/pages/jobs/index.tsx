import { Container } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

import { JobsListing } from '../../components/jobs/JobsListing';

const Jobs = () => {
  return (
    <>
      <Head>
        <title>Job offers | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container lg>
        <JobsListing />
      </Container>
    </>
  );
};

export default Jobs;
