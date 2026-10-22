import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { faqItems } from '../components/contact/Faq';
import { Feed } from '../components/feed/Feed';
import { Home } from '../components/home/Home';
import { PageHead } from '../components/seo/PageHead';
import { faqSchema, organizationSchema, websiteSchema } from '../content/seo/schema';
import { useSession } from '../hooks/useSession';

export default function HomePage() {
  const { isSignedIn } = useSession();

  return (
    <>
      <PageHead
        title="Hire Clippers & Find Clipping Jobs | Kreatli Marketplace"
        description="Kreatli Marketplace connects YouTubers, streamers and podcasters with vetted clippers. Post a clipping job for fixed pay, or join as a clipper and get hired."
        path="/"
        ogImageTitle="Hire clippers. Find clipping jobs."
        jsonLd={[organizationSchema(), websiteSchema(), faqSchema(faqItems)]}
      />
      {isSignedIn ? <Feed /> : <Home />}
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'signIn', 'signUp'])),
    },
  };
}
