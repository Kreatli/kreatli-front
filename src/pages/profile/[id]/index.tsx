import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { CreatorProfile } from '../../../components/profile/CreatorProfile';
import { ProfessionalProfile } from '../../../components/profile/ProfessionalProfile';
import { useUser } from '../../../hooks/useUser';

const Profile: React.FC = () => {
  const router = useRouter();
  const userId = router.query.id as string | undefined;

  const { user } = useUser(userId, true);

  const pageTitle = `Kreatli | ${user?.name ?? ''}`;

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
