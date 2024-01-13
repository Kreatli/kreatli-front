import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { SignUpCreator } from '../../components/auth/SignUpCreator';
import { useSession } from '../../hooks/useSession';

const Creator = () => {
  const { isSignedIn, isLoading } = useSession();
  const router = useRouter();

  React.useLayoutEffect(() => {
    if (!isLoading && isSignedIn) {
      router.replace('/');
    }
  }, [isLoading, isSignedIn, router]);

  if (isSignedIn) {
    return null;
  }

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
