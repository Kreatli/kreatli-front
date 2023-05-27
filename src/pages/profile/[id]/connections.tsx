import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { Connections } from '../../../components/profile/Connections';
import { useUser } from '../../../hooks/useUser';
import { Common } from '../../../typings/common';

const ConnectionsPage: React.FC = () => {
  const router = useRouter();
  const userId = router.query.id as Common.MaybeId;
  const { user } = useUser(userId);

  const pageTitle = `Kreatli | ${user?.name ?? ''}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Connections userId={userId} />
    </>
  );
};

export default ConnectionsPage;
