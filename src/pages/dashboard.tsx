import { Container, Text } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <>
      <Head>
        <title>Dashboard | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container sm>
        <Text h2>Dashboard</Text>
      </Container>
    </>
  );
};

export default Dashboard;
