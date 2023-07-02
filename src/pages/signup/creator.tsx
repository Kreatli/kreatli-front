import Head from 'next/head';
import React from 'react';

import { SignUpCreator } from '../../components/auth/SignUpCreator';

const Creator: React.FC = () => {
  return (
    <>
      <Head>
        <title>Sign up | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <SignUpCreator />
    </>
  );
};

export default Creator;
