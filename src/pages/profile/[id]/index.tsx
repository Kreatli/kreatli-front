import Head from 'next/head';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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
      {user?.role === 'creator' && <CreatorProfile userId={userId} />}
      {user?.role === 'professional' && <ProfessionalProfile userId={userId} />}
      {user?.role === 'admin' && (
        <div className="max-w-screen-lg mx-auto">
          <pre className="overflow-auto">
            <code>{JSON.stringify(user, null, 2)}</code>
          </pre>
        </div>
      )}
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Profile;
