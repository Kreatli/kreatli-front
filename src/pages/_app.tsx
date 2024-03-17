import '../styles/globals.scss';
import 'react-image-crop/dist/ReactCrop.css';

import { GoogleTagManager } from '@next/third-parties/google';
import { NextUIProvider } from '@nextui-org/react';
import { Query, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { ApplicationLoader } from '../components/app/ApplicationLoader';
import { DashboardTiersModal } from '../components/dashboard/DashboardTiers';
import { Header } from '../components/layout/Header';
import { Notifications } from '../components/various/Notifications';
import { useNotifications } from '../hooks/useNotifications';
import { getErrorMessage } from '../utils/getErrorMessage';

interface QueryErrorMeta {
  showErrorNotification?: boolean;
  errorMessage?: string;
}

export default function App({ Component, pageProps }: AppProps) {
  const { pushNotification } = useNotifications();

  const [queryClient] = React.useState(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
      queryCache: new QueryCache({
        onError: (error, meta: Query<any, any, any> & QueryErrorMeta) => {
          if (!meta.showErrorNotification && !meta.errorMessage) {
            return;
          }

          pushNotification({
            message: meta.errorMessage || getErrorMessage(error),
            color: 'danger',
            icon: 'error',
          });
        },
      }),
    }),
  );

  // @ts-ignore
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Kreatli</title>
        <meta name="description" content="Kreatli is a place where Editors, Designers, and Producers find YouTube Creators to work with and build a professional network." />
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
          <DashboardTiersModal />
        </NextUIProvider>
      </QueryClientProvider>
      {process.env.GTM_ID && <GoogleTagManager gtmId={process.env.GTM_ID} />}
    </>
  );
}
