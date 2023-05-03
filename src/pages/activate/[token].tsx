import { Container, Loading, Spacer, Text } from '@nextui-org/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';

import { Layout } from '../../layouts/default';
import { requestUserActivation } from '../../services/auth';

const AccountActivation: React.FC = () => {
  const router = useRouter();
  const { mutate, isLoading } = useMutation(requestUserActivation, {
    // TODO: show notification on error
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
        <title>Kreali | Activate your account</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Layout>
        <Container css={{ textAlign: 'center' }}>
          <Spacer y={2} />
          {isLoading
            ? <Loading size="lg" />
            : <Text h3>Your account has been activated! You can sign in now.</Text>}
        </Container>
      </Layout>
    </>
  );
};

export default AccountActivation;
