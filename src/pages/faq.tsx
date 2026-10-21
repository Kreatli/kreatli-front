import { Chip } from '@nextui-org/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { Faq, faqItems } from '../components/contact/Faq';
import { TextLinear } from '../components/home/TextLinear';
import { PageHead } from '../components/seo/PageHead';
import { faqSchema } from '../content/seo/schema';

const FaqPage = () => {
  return (
    <>
      <PageHead
        title="Kreatli Marketplace FAQ: Hiring Clippers & Clipping Jobs"
        description="Answers about Kreatli Marketplace: how clippers are verified, what it costs to post a clipping job, how clippers find work, tiers, points and Premium."
        path="/faq"
        jsonLd={faqSchema(faqItems)}
      />
      <div className="container max-w-screen-md text-center mx-auto px-6">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          FAQ
        </Chip>
        <h1 className="text-4xl font-semibold mx-auto mt-2 mb-8">
          Frequently Asked <br />
          <TextLinear>Questions</TextLinear>
        </h1>
        <Faq />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'signIn', 'signUp'])),
    },
  };
}

export default FaqPage;
