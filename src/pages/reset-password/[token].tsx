import Head from 'next/head';
import React from 'react';

import { Layout } from '../../layouts/default';

const ResetPassword: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kreali | Reset password</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Layout>
        Reset password page
      </Layout>
    </>
  );
};

export default ResetPassword;
