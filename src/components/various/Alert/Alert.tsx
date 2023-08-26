import React from 'react';

import { Icon } from '../Icon';
import styles from './Alert.module.scss';

interface Props {
  text: string;
  children?: React.ReactNode;
}

export const Alert = ({ text, children }: Props) => {
  return (
    <div className={styles.alert}>
      <p className={`${styles.text} text-sm text-gray-600`}>
        <Icon icon="logo" size={20} className={styles.icon} />
        {text}
      </p>
      <div className={styles.actions}>
        {children}
      </div>
    </div>
  );
};
