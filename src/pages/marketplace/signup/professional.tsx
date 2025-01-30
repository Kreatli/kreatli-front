import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { SignUpProfessional } from '../../../components/marketplace/auth/SignUpProfessional';
import { useSession } from '../../../hooks/marketplace/useSession';

const Professional = () => {
  const { isSignedIn, isLoading } = useSession();
  const router = useRouter();

  React.useLayoutEffect(() => {
    if (!isLoading && isSignedIn) {
      router.replace('/marketplace');
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
