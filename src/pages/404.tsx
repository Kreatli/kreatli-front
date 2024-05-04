import { Button, Chip } from '@nextui-org/react';
import Head from 'next/head';
import NextLink from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Page not found | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <div className="container max-w-screen-lg mx-auto px-6 text-center">
        <Chip variant="flat" color="secondary" classNames={{ content: 'font-semibold' }}>
          404
        </Chip>
        <h2 className="text-4xl font-semibold my-2">Page not found</h2>
        <p className="mb-8 text-large text-foreground-500">
          Sorry, but the page you were looking for could not be found 😢
        </p>
        <Button as={NextLink} href="/" color="secondary">
          Go to home page
        </Button>
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

export default NotFound;
