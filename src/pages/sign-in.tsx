import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { SignInForm } from '../components/review-tool/auth/SignInForm';
import { StartPageLayout } from '../components/review-tool/layout/StartPageLayout';
import { useSession } from '../hooks/review-tool/useSession';

export default function SignIn() {
  const router = useRouter();
  const { isSignedIn } = useSession();

  React.useEffect(() => {
    if (isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn, router]);

  const handleSuccess = () => {
    router.push('/');
  };

  if (isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Sign in | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <StartPageLayout title="Sign in to get started." backgroundType="light">
        <SignInForm onSuccess={handleSuccess} />
      </StartPageLayout>
    </>
  );
}
