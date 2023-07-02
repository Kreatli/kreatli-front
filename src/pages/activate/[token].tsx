import { Container, Loading } from '@nextui-org/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';

import { useNotifications } from '../../hooks/useNotifications';
import { requestUserActivation } from '../../services/auth';
import { getErrorMessage } from '../../utils/getErrorMessage';

const AccountActivation: React.FC = () => {
  const router = useRouter();
  const pushNotification = useNotifications((state) => state.pushNotification);
  const { mutate } = useMutation(requestUserActivation, {
    onSettled: () => {
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
        color: 'error',
        icon: 'error',
      });
    },
  });

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const { token } = router.query;

    if (!token) {
      router.push('/');

      return;
    }

    mutate({ token: token.toString() });
  }, [router]);

  return (
    <>
      <Head>
        <title>Activate your account | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container css={{ textAlign: 'center' }}>
        <Loading size="lg" />
      </Container>
    </>
  );
};

export default AccountActivation;
