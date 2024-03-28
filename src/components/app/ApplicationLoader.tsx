import { Spinner } from '@nextui-org/react';
import cx from 'classnames';
import React from 'react';

import LogoIcon from '../../assets/images/logo.svg';
import { useApplicationLoader } from '../../hooks/useApplicationLoader';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Layout } from '../../typings/layout';
import styles from './ApplicationLoader.module.scss';

interface Props {
  children: React.ReactNode;
}

export const ApplicationLoader = ({ children }: Props) => {
  const isLoading = useApplicationLoader((state) => state.isLoading);

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
