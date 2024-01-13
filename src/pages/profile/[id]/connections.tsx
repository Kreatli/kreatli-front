import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { Connections } from '../../../components/profile/Connections';
import { useProtectedPage } from '../../../hooks/useProtectedPage';
import { useUser } from '../../../hooks/useUser';
import { Common } from '../../../typings/common';

const ConnectionsPage = () => {
  const router = useRouter();
  const userId = router.query.id as Common.MaybeId;
  const { user } = useUser(userId);
  const { isSignedIn } = useProtectedPage();

  if (!isSignedIn) {
    return null;
  }

  const pageTitle = `Connections | ${user?.name ?? ''} | Kreatli`;

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
