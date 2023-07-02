import Head from 'next/head';
import React from 'react';

import { SignUpProfessional } from '../../components/auth/SignUpProfessional';

const Professional: React.FC = () => {
  return (
    <>
      <Head>
        <title>Sign up | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <SignUpProfessional />
    </>
  );
};

export default Professional;
