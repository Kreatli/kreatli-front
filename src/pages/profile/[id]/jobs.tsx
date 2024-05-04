import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { MyJobsApplications, MyJobsOffers } from '../../../components/jobs/MyJobs';
import { useProtectedPage } from '../../../hooks/useProtectedPage';
import { useUser } from '../../../hooks/useUser';
import { Common } from '../../../typings/common';

const JobsPage = () => {
  const router = useRouter();
  const userId = router.query.id as Common.MaybeId;
  const { user } = useUser(userId);
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  const pageTitle = `My jobs | ${user?.name ?? ''} | Kreatli`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      {user && (
        <div className="container max-w-screen-lg mx-auto px-6">
          {user.role === 'creator' ? <MyJobsOffers /> : <MyJobsApplications />}
        </div>
      )}
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default JobsPage;
