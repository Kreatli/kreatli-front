import Head from 'next/head';
import React from 'react';

import { SignUpForm } from '../components/review-tool/auth/SignUpForm';
import { StartPageLayout } from '../components/review-tool/layout/StartPageLayout';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Sign up | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <StartPageLayout title="Create an account to get started!">
        <SignUpForm />
      </StartPageLayout>
    </>
  );
}
