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

export default ResetPassword;
