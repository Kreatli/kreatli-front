import { Chip } from '@nextui-org/react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { Faq } from '../components/contact/Faq';
import { TextLinear } from '../components/home/TextLinear';

const FaqPage = () => {
  return (
    <>
      <Head>
        <title>FAQ | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-md text-center mx-auto px-6">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          FAQ
        </Chip>
        <h2 className="text-4xl font-semibold mx-auto mt-2 mb-8">
          Frequently Asked <br />
          <TextLinear>Questions</TextLinear>
        </h2>
        <Faq />
      </div>
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

export default FaqPage;
