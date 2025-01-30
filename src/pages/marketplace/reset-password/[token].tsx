import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { ChangePasswordForm } from '../../../components/marketplace/auth/ChangePasswordForm';
import { useSession } from '../../../hooks/marketplace/useSession';

const ResetPassword = () => {
  const router = useRouter();
  const { isSignedIn, isLoading } = useSession();
  const { token = '' } = router.query;

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!token || (!isLoading && isSignedIn)) {
      router.replace('/marketplace');
    }
  }, [isLoading, isSignedIn, router, token]);

  if (isSignedIn) {
    return null;
  }

  const handleSubmit = () => {
    router.push('/marketplace');
  };

  return (
    <>
      <Head>
        <title>Reset password | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-xl mx-auto px-6 text-center">
        <div className="flex justify-center">
          <div className="w-96 max-w-full">
            <ChangePasswordForm token={token.toString()} onSuccess={handleSubmit} onError={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'signIn', 'signUp'])),
    },
  };
}

export default ResetPassword;
