import { Container, Spacer, Text } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

import { Layout } from '../layouts/default';

const Faq: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kreali | FAQ</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Layout>
        <Spacer y={2} />
        <Container>
          <Text h2>FAQ</Text>
        </Container>
      </Layout>
    </>
  );
};

export default Faq;
