import Error from 'next/error';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { JobsCreation } from '../../components/jobs/JobCreation';
import { JobPostSignUpGate } from '../../components/jobs/JobPostSignUpGate';
import { useSession } from '../../hooks/useSession';
import { setPostAuthRedirect } from '../../utils/postAuthRedirect';

const JOB_CREATION_PATH = '/jobs/create';

const JobsCreate = () => {
  const { currentUser, isSignedIn, isLoading } = useSession();
  // The sign-up/sign-in components re-check the session when they mount, which briefly flips
  // isLoading back on. Latch the first answer so the gate doesn't unmount and remount in a loop.
  const [hasCheckedSession, setHasCheckedSession] = React.useState(false);
  const isSignedOut = hasCheckedSession && !isSignedIn;

  React.useEffect(() => {
    if (!isLoading) {
      setHasCheckedSession(true);
    }
  }, [isLoading]);

  // Signed-out visitors (coming from "Post a clipping job" buttons) sign up here instead of being sent
  // to the homepage; remember where they were going so sign-in brings them back.
  React.useEffect(() => {
    if (isSignedOut) {
      setPostAuthRedirect(JOB_CREATION_PATH);
    }
  }, [isSignedOut]);

  if (!isSignedIn) {
    return isSignedOut ? (
      <>
        <Head>
          <title>Post a clipping job | Kreatli Marketplace</title>
          <meta name="description" content="Create a free creator account to post a clipping job on Kreatli Marketplace." />
        </Head>
        <JobPostSignUpGate />
      </>
    ) : null;
  }

  if (currentUser?.role === 'professional') {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>Create a job posting | Kreatli Marketplace</title>
        <meta name="description" content="Kreatli Marketplace" />
      </Head>
      <div className="container max-w-screen-lg mx-auto px-6">
        <JobsCreation />
      </div>
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

export default JobsCreate;
