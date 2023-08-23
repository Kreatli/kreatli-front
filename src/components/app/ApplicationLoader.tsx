import { Spinner } from '@nextui-org/react';
import cx from 'classnames';
import React from 'react';

import LogoIcon from '../../assets/images/logo.svg';
import { useApplicationLoader } from '../../hooks/useApplicationLoader';
import styles from './ApplicationLoader.module.scss';

interface Props {
  children: React.ReactNode;
}

export const ApplicationLoader = ({ children }: Props) => {
  const isLoading = useApplicationLoader((state) => state.isLoading);

  return (
    <>
      {children}
      <div className={cx(styles.wrapper, { [styles.hidden]: !isLoading })}>
        <LogoIcon className={styles.logo} viewBox="0 0 90 22" />
        <Spinner size="lg" color="secondary" className={styles.loader} />
      </div>
    </>
  );
};
