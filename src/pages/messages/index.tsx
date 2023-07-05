import { Container, Text } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

const Messages: React.FC = () => {
  return (
    <>
      <Head>
        <title>Messages | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container sm>
        <Text h2>Messages</Text>
      </Container>
    </>
  );
};

export default Messages;
