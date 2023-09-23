import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { CreatorProfile } from '../../../components/profile/CreatorProfile';
import { ProfessionalProfile } from '../../../components/profile/ProfessionalProfile';
import { useUser } from '../../../hooks/useUser';
import { Common } from '../../../typings/common';

const Profile: React.FC = () => {
  const router = useRouter();
  const userId = router.query.id as Common.MaybeId;

  const { user } = useUser(userId, true);

  const pageTitle = `${user?.name ?? ''} | Kreatli`;

  // TODO: profile posts at the end of the page

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      {user && (
        user?.role === 'creator'
          ? <CreatorProfile userId={user._id} />
          : <ProfessionalProfile userId={user._id} />
      )}
    </>
  );
};

export default Profile;
