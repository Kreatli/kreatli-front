import { Container } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

import { ProfessionalListing } from '../components/professionals/ProfessionalListing';

const Professionals = () => {
  return (
    <>
      <Head>
        <title>Professionals | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container lg>
        <ProfessionalListing />
      </Container>
    </>
  );
};

export default Professionals;
