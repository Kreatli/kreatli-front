import { Chip } from '@nextui-org/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { ContactForm } from '../components/contact/ContactForm';
import { TextLinear } from '../components/home/TextLinear';
import { PageHead } from '../components/seo/PageHead';

const Contact = () => {
  return (
    <>
      <PageHead
        title="Contact Us | Kreatli"
        description="Questions about hiring clippers or finding clipping jobs on Kreatli Marketplace? Send us a message or email support@kreatli.com and we'll get back to you."
        path="/contact"
      />
      <div className="container max-w-screen-lg mx-auto px-6 text-center">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          Contact
        </Chip>
        <h1 className="text-4xl font-semibold my-2">
          Have some questions?
          <br /> <TextLinear>Contact us</TextLinear>
        </h1>
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
