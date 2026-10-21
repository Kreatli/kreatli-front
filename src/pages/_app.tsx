import '../styles/globals.scss';
import 'react-image-crop/dist/ReactCrop.css';

import { GoogleTagManager } from '@next/third-parties/google';
import { NextUIProvider } from '@nextui-org/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Query, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Source_Sans_3 as SourceSans3 } from 'next/font/google';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import React from 'react';

import { AmplitudeInit } from '../components/app/AmplitudeInit';
import { ApplicationLoader } from '../components/app/ApplicationLoader';
import { LazyDashboardTiersModal, LazySignUpCreatorModal } from '../components/app/LazyAppModals';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { DefaultHead } from '../components/seo/DefaultHead';
import { Notifications } from '../components/various/Notifications';
import { useNotifications } from '../hooks/useNotifications';
import { getErrorMessage } from '../utils/getErrorMessage';

// Self-hosted by next/font: no render-blocking request to Google Fonts and no layout shift on swap.
const sourceSans = SourceSans3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

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
      <DefaultHead />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>
        {`
          html {
            font-family: ${sourceSans.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider id="nextUiProvider">
          <ApplicationLoader>
            <GoogleOAuthProvider clientId={process.env.GOOGLE_OAUTH_CLIENT_ID as string}>
              <Header />
              <main>{getLayout(<Component {...pageProps} />)}</main>
              <Footer />
              <Notifications />
              <LazySignUpCreatorModal />
            </GoogleOAuthProvider>
          </ApplicationLoader>
          <LazyDashboardTiersModal />
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
