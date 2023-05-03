import Head from 'next/head';
import React from 'react';

import { SignUpProfessional } from '../../components/auth/SignUpProfessional';
import { Layout } from '../../layouts/default';

const Professional: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kreali | Sign up</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Layout>
        <SignUpProfessional />
      </Layout>
    </>
  );
};

export default Professional;
