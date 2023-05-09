import { Container, Text } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

const Contact: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kreatli | Contact</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container>
        <Text h2>Contact</Text>
      </Container>
    </>
  );
};

export default Contact;
