import { Button, Chip } from '@nextui-org/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { Header } from '../components/review-tool/layout/Header';
import { useSession } from '../hooks/review-tool/useSession';

const NotFound = () => {
  const { isSignedIn } = useSession();

  return (
    <>
      <Head>
        <title>Page not found | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Header />
      <div className="container max-w-screen-lg mx-auto px-6 text-center">
        <Chip variant="flat" color="default" classNames={{ content: 'font-semibold' }}>
          404
        </Chip>
        <h2 className="text-4xl font-semibold my-2">Page not found</h2>
        <p className="mb-8 text-large text-foreground-500">
          Sorry, but the page you were looking for could not be found 😢
        </p>
        <Button as={NextLink} href="/" className="bg-foreground text-content1">
          Go to {isSignedIn ? 'my projects' : 'home page'}
        </Button>
      </div>
    </>
  );
};

export default NotFound;
