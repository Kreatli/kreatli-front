import { Container, Spacer, Text } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

import { CreativesList } from '../components/professionals/CreativesList';

const Professionals: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kreatli | Find professionals</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container>
        <Text h2>Find professionals</Text>
      </Container>
      <Spacer y={1} />
      <CreativesList />
    </>
  );
};

export default Professionals;
