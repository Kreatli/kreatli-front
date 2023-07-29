import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { useUser } from '../../../hooks/useUser';
import { Common } from '../../../typings/common';

const JobsPage: React.FC = () => {
  const router = useRouter();
  const userId = router.query.id as Common.MaybeId;
  const { user } = useUser(userId);

  const pageTitle = `Jobs | ${user?.name ?? ''} | Kreatli`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      Jobs
    </>
  );
};

export default JobsPage;
