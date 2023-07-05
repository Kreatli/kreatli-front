import { Container } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

import { JobsCreation } from '../../components/jobs/JobCreation';

const JobsCreate = () => {
  return (
    <>
      <Head>
        <title>Create a job offer | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container sm>
        <JobsCreation />
      </Container>
    </>
  );
};

export default JobsCreate;
