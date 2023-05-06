import React from 'react';

import { Header } from '../components/layout/Header';
import { Notifications } from '../components/various/Notifications';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <footer />
      <Notifications />
    </>
  );
};
