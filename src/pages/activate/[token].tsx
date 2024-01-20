import { Spinner } from '@nextui-org/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';

import { useNotifications } from '../../hooks/useNotifications';
import { useSession } from '../../hooks/useSession';
import { requestUserActivation } from '../../services/auth';
import { getErrorMessage } from '../../utils/getErrorMessage';

const AccountActivation = () => {
  const router = useRouter();
  const { isSignedIn, isLoading } = useSession();
  const pushNotification = useNotifications((state) => state.pushNotification);

  const { mutate } = useMutation(requestUserActivation, {
    onSuccess: () => {
      router.push('/');
      pushNotification({
        message: 'Your account has been activated! You can sign in now.',
        color: 'success',
        icon: 'success',
      });
    },
    onError: (error) => {
      router.push('/');
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
      router.replace('/');

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

export default AccountActivation;
