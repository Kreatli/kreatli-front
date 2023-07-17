import { Container } from '@nextui-org/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import { JobPage } from '../../components/jobs/JobPage';
import { requestJobOffer } from '../../services/job';
import { Common } from '../../typings/common';

const JobOffer: React.FC = () => {
  const router = useRouter();
  const jobOfferId = router.query.id as Common.MaybeId;

  const fetchJobOffer = () => {
    if (jobOfferId) {
      return requestJobOffer(jobOfferId);
    }

    return undefined;
  };

  // TODO: handle error
  const { data } = useQuery(['job-offer', jobOfferId], fetchJobOffer);

  const pageTitle = `${data?.title ?? ''} | Kreatli`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container sm css={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {data && (
          <JobPage {...data} />
        )}
      </Container>
    </>
  );
};

export default JobOffer;
