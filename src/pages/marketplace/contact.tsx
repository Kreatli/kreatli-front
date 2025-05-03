import { Chip } from '@heroui/react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { ContactForm } from '../../components/marketplace/contact/ContactForm';
import { TextLinear } from '../../components/marketplace/home/TextLinear';

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-lg mx-auto px-6 text-center">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          Contact
        </Chip>
        <h2 className="text-4xl font-semibold my-2">
          Have some questions?
          <br /> <TextLinear>Contact us</TextLinear>
        </h2>
        <p className="mb-8 text-large text-foreground-500">
          We&apos;re all ears! Fill out the form below and let&apos;s chat!
        </p>
        <div className="max-w-[600px] mx-auto">
          <ContactForm />
        </div>
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

export default Contact;
