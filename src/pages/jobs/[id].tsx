import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { Common } from '../../typings/common';

const JobOffer: React.FC = () => {
  const router = useRouter();
  const jobOfferId = router.query.id as Common.MaybeId;

  const pageTitle = ' | Kreatli';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      {jobOfferId}
    </>
  );
};

export default JobOffer;
