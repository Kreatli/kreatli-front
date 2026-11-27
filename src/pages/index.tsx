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
        description="Hire clippers for your YouTube, Twitch and podcast content: post a clipping job to hire a clipper for fixed pay, or join Kreatli Marketplace as a clipper."
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
