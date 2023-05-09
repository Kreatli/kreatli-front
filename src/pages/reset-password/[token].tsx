import { Container, Grid } from '@nextui-org/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { ChangePasswordForm } from '../../components/auth/ChangePasswordForm';

const ResetPassword: React.FC = () => {
  const router = useRouter();
  const { token = '' } = router.query;

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!token) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Kreatli | Reset password</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container css={{ textAlign: 'center' }}>
        <Grid.Container justify="center">
          <Grid css={{ width: 'min(100%, 400px)' }}>
            <ChangePasswordForm token={token.toString()} onSuccess={handleSubmit} onError={handleSubmit} />
          </Grid>
        </Grid.Container>
      </Container>
    </>
  );
};

export default ResetPassword;
