import '../styles/globals.scss';
import 'react-image-crop/dist/ReactCrop.css';

import { addToast, HeroUIProvider, ToastProvider } from '@heroui/react';
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Query, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import { DashboardTiersModal } from '../components/marketplace/dashboard/DashboardTiers';
import { Layout as MarketplaceLayout } from '../components/marketplace/layout/Layout';
import { Layout as ReviewToolLayout } from '../components/review-tool/layout/Layout';
import { Notifications } from '../components/various/Notifications';
import { getErrorMessage } from '../utils/marketplace/getErrorMessage';

interface QueryErrorMeta {
  showErrorNotification?: boolean;
  errorMessage?: string;
}

const App = ({ Component, pageProps, router }: AppProps) => {
  const AppLayout = router.pathname.startsWith('/marketplace') ? MarketplaceLayout : ReviewToolLayout;

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            retry: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error, meta: Query<any, any, any> & QueryErrorMeta) => {
            if (!meta.showErrorNotification && !meta.errorMessage) {
              return;
            }

            addToast({
              title: meta.errorMessage || getErrorMessage(error),
              color: 'danger',
              variant: 'flat',
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
        <meta
          name="description"
          content="Kreatli is a place where Editors, Designers, and Producers find YouTube Creators to work with and build a professional network."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no" />
      </Head>
      <QueryClientProvider client={queryClient}>
        {/* @ts-ignore */}
        <HeroUIProvider id="heroUiProvider">
          <ToastProvider />
          <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID as string}>
            <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
          </GoogleOAuthProvider>
          <Notifications />
          <DashboardTiersModal />
        </HeroUIProvider>
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
