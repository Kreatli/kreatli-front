import '../styles/globals.scss';
import 'react-image-crop/dist/ReactCrop.css';

import { GoogleTagManager } from '@next/third-parties/google';
import { NextUIProvider } from '@nextui-org/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Query, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import { AmplitudeInit } from '../components/app/AmplitudeInit';
import { ApplicationLoader } from '../components/app/ApplicationLoader';
import { SignUpCreatorModal } from '../components/auth/SignUpCreator';
import { DashboardTiersModal } from '../components/dashboard/DashboardTiers';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { Notifications } from '../components/various/Notifications';
import { BRAND_NAME, DEFAULT_META_DESCRIPTION } from '../constants/brand';
import { useNotifications } from '../hooks/useNotifications';
import { getErrorMessage } from '../utils/getErrorMessage';

interface QueryErrorMeta {
  showErrorNotification?: boolean;
  errorMessage?: string;
}

const App = ({ Component, pageProps }: AppProps) => {
  const { pushNotification } = useNotifications();

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
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
      <AmplitudeInit />
      <Head>
        <title>{BRAND_NAME}</title>
        <meta name="description" content={DEFAULT_META_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider id="nextUiProvider">
          <ApplicationLoader>
            <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID as string}>
              <Header />
              <main>{getLayout(<Component {...pageProps} />)}</main>
              <Footer />
              <Notifications />
              <SignUpCreatorModal />
            </GoogleOAuthProvider>
          </ApplicationLoader>
          <DashboardTiersModal />
        </NextUIProvider>
      </QueryClientProvider>
      {process.env.GTM_ID && <GoogleTagManager gtmId={process.env.GTM_ID} />}
      {process.env.ENABLE_REDDIT_PIXEL === 'true' && (
        <Script
          id="reddit-pixel"
          dangerouslySetInnerHTML={{
            // eslint-disable-next-line max-len
            __html:
              // eslint-disable-next-line max-len, @typescript-eslint/quotes
              `!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_erzexreig3w8');rdt('track', 'PageVisit');`,
          }}
        />
      )}
    </>
  );
};

export default appWithTranslation(App);
