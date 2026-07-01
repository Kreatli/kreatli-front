import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { SignUpProfessional } from '../../components/auth/SignUpProfessional';
import { useSession } from '../../hooks/useSession';

const Professional = () => {
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
        <title>Sign up | Kreatli Marketplace</title>
        <meta name="description" content="Kreatli Marketplace" />
      </Head>
      <SignUpProfessional />
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'signIn', 'signUp'])),
    },
  };
}

export default Professional;
