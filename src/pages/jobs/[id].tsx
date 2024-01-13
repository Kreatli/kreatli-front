import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import { JobPage } from '../../components/jobs/JobPage';
import { useNotifications } from '../../hooks/useNotifications';
import { useProtectedPage } from '../../hooks/useProtectedPage';
import { requestJobOffer } from '../../services/job';
import { Common } from '../../typings/common';
import { getErrorMessage } from '../../utils/getErrorMessage';

const JobOffer = () => {
  const { isSignedIn } = useProtectedPage();
  const { pushNotification } = useNotifications();
  const router = useRouter();
  const jobOfferId = router.query.id as Common.MaybeId;

  const fetchJobOffer = () => {
    if (jobOfferId) {
      return requestJobOffer(jobOfferId);
    }

    return undefined;
  };

  const { data } = useQuery(['job-offer', jobOfferId], fetchJobOffer, {
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
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
