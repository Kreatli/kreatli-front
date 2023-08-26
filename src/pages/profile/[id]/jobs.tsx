import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { MyJobsApplications, MyJobsOffers } from '../../../components/jobs/MyJobs';
import { useUser } from '../../../hooks/useUser';
import { Common } from '../../../typings/common';

const JobsPage: React.FC = () => {
  const router = useRouter();
  const userId = router.query.id as Common.MaybeId;
  const { user } = useUser(userId);

  const pageTitle = `My jobs | ${user?.name ?? ''} | Kreatli`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      {user && (
        <div className="container max-w-screen-lg mx-auto px-6">
          {user.role === 'creator'
            ? <MyJobsOffers />
            : <MyJobsApplications />}
        </div>
      )}
    </>
  );
};

export default JobsPage;
