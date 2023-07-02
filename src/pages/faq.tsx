import { Container, Text } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

const Faq: React.FC = () => {
  return (
    <>
      <Head>
        <title>FAQ | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container sm>
        <Text h2>FAQ</Text>
      </Container>
    </>
  );
};

export default Faq;
