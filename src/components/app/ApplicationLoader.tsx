import { Loading } from '@nextui-org/react';
import cx from 'classnames';
import Image from 'next/image';
import React from 'react';

// TODO: get rid of ts-ignore
// @ts-ignore
import logoImage from '../../assets/images/logo.svg?url';
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
        <Image src={logoImage} className={styles.logo} loading="eager" alt="Kreatli" />
        <Loading size="lg" color="secondary" className={styles.loader} />
      </div>
    </>
  );
};
