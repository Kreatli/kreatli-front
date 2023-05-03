import { Container, Spacer, Text } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

import { CreativesList } from '../components/professionals/CreativesList';
import { Layout } from '../layouts/default';

const Professionals: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kreali | Find professionals</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Layout>
        <Spacer y={2} />
        <Container>
          <Text h2>Find professionals</Text>
        </Container>
        <Spacer y={1} />
        <CreativesList />
      </Layout>
    </>
  );
};

export default Professionals;
