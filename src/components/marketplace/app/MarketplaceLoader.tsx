import { Spinner } from '@heroui/react';
import cx from 'classnames';
import React from 'react';

import LogoIcon from '../../../assets/images/logo.svg';
import { useMarketplaceLoader } from '../../../hooks/marketplace/useMarketplaceLoader';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { Layout } from '../../../typings/layout';
import styles from './MarketplaceLoader.module.scss';

interface Props {
  children: React.ReactNode;
}

export const MarketplaceLoader = ({ children }: Props) => {
  const isLoading = useMarketplaceLoader((state) => state.isLoading);

  const [theme] = useLocalStorage<Layout.Theme>({ key: 'theme', defaultValue: 'light' });

  React.useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');

      return;
    }

    document.documentElement.classList.remove('dark');
  }, [theme]);

  return (
    <>
      {children}
      <div className={cx(styles.wrapper, { [styles.hidden]: !isLoading })} aria-hidden={!isLoading}>
        <LogoIcon className={styles.logo} viewBox="0 0 90 22" />
        <Spinner size="lg" color="secondary" className={styles.loader} />
      </div>
    </>
  );
};
