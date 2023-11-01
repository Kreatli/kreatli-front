import '../styles/globals.scss';
import 'react-image-crop/dist/ReactCrop.css';

import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ApplicationLoader } from '../components/app/ApplicationLoader';
import { Header } from '../components/layout/Header';
import { Notifications } from '../components/various/Notifications';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    }),
  );

  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Kreatli</title>
        <meta name="description" content="Kreatli - " />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider id="nextUiProvider">
          <ApplicationLoader>
            <Header />
            <main>
              {getLayout(<Component {...pageProps} />)}
            </main>
            <footer />
            <Notifications />
          </ApplicationLoader>
        </NextUIProvider>
      </QueryClientProvider>
    </>
  );
}
