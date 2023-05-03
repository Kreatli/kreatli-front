import Head from 'next/head';
import React from 'react';

import { SignUpCreator } from '../../components/auth/SignUpCreator';
import { Layout } from '../../layouts/default';

const Creator: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kreali | Sign up</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Layout>
        <SignUpCreator />
      </Layout>
    </>
  );
};

export default Creator;
