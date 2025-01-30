import Head from 'next/head';
import React from 'react';

import { MarketplaceLoader } from '../../app/MarketplaceLoader';
import { SignUpCreatorModal } from '../../auth/SignUpCreator';
import { Header } from '../Header';

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Head>
        <style>
          {`
            @media screen and (max-width: 960px) {
              html {
                font-size: 14px;
              }
            }
        `}
        </style>
      </Head>
      <MarketplaceLoader>
        <Header />
        <main>{children}</main>
        <footer />
        <SignUpCreatorModal />
      </MarketplaceLoader>
    </>
  );
};
