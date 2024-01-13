import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { CreatorProfile } from '../../../components/profile/CreatorProfile';
import { ProfessionalProfile } from '../../../components/profile/ProfessionalProfile';
import { useProtectedPage } from '../../../hooks/useProtectedPage';
import { useUser } from '../../../hooks/useUser';
import { Common } from '../../../typings/common';

const Profile = () => {
  const router = useRouter();
  const userId = router.query.id as Common.MaybeId;

  const { user } = useUser(userId, true);
  const { isSignedIn } = useProtectedPage();

  if (!userId || !isSignedIn) {
    return null;
  }

  const pageTitle = `${user?.name ?? ''} | Kreatli`;

  // TODO: profile posts at the end of the page

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      {user?.role === 'creator'
        ? <CreatorProfile userId={userId} />
        : <ProfessionalProfile userId={userId} />}
    </>
  );
};

export default Profile;
