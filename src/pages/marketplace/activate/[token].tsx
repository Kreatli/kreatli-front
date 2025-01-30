import { Spinner } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { useSession } from '../../../hooks/marketplace/useSession';
import { useNotifications } from '../../../hooks/useNotifications';
import { requestUserActivation } from '../../../services/marketplace/auth';
import { getErrorMessage } from '../../../utils/marketplace/getErrorMessage';

const AccountActivation = () => {
  const router = useRouter();
  const { isSignedIn, isLoading } = useSession();
  const pushNotification = useNotifications((state) => state.pushNotification);

  const { mutate } = useMutation({
    mutationFn: requestUserActivation,
    onSuccess: () => {
      router.push('/marketplace');
      pushNotification({
        message: 'Your account has been activated! You can sign in now.',
        color: 'success',
        icon: 'success',
      });
    },
    onError: (error) => {
      router.push('/marketplace');
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { token } = router.query;

    if (!token || (!isLoading && isSignedIn)) {
      router.replace('/marketplace');

      return;
    }

    if (!isLoading) {
      mutate({ token: token.toString() });
    }
  }, [isLoading, isSignedIn, mutate, router]);

  if (isSignedIn) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Activate your account | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-xl mx-auto px-6 text-center">
        <Spinner size="lg" color="secondary" />
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

export default AccountActivation;
