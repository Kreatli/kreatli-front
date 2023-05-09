import { Container, Text } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

const Faq: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kreatli | FAQ</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container>
        <Text h2>FAQ</Text>
      </Container>
    </>
  );
};

export default Faq;
