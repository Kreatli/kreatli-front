import { Container, Spacer, Text } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

import { Layout } from '../layouts/default';

const Contact: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kreali | Contact</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Layout>
        <Spacer y={2} />
        <Container>
          <Text h2>Contact</Text>
        </Container>
      </Layout>
    </>
  );
};

export default Contact;
