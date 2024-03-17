import { useQuery } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { JobPage } from '../../components/jobs/JobPage';
import { useProtectedPage } from '../../hooks/useProtectedPage';
import { requestJobOffer } from '../../services/job';
import { Common } from '../../typings/common';

const JobOffer = () => {
  const { isSignedIn } = useProtectedPage();
  const router = useRouter();
  const jobOfferId = router.query.id as Common.MaybeId;

  const fetchJobOffer = () => {
    if (jobOfferId) {
      return requestJobOffer(jobOfferId);
    }

    return undefined;
  };

  const { data } = useQuery({
    meta: {
      showNotificationError: true,
    },
    queryKey: ['job-offer', jobOfferId],
    queryFn: fetchJobOffer,
  });

  if (!isSignedIn) {
    return null;
  }

  const pageTitle = `${data?.title ?? ''} | Kreatli`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-lg mx-auto px-6 flex-1 flex flex-col justify-between">
        {data && (
          <JobPage {...data} />
        )}
      </div>
    </>
  );
};

export default JobOffer;
