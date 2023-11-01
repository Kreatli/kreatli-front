import cx from 'classnames';
import React from 'react';

import { Icon } from '../Icon';
import styles from './Alert.module.scss';

interface Props {
  text: React.ReactNode;
  width?: 'auto';
  children?: React.ReactNode;
}

export const Alert = ({ text, width, children }: Props) => {
  return (
    <div className={cx(styles.alert, { [styles.auto]: width === 'auto' })}>
      <p className={`${styles.text} text-sm text-gray-600`}>
        <Icon icon="logo" size={20} className={styles.icon} />
        {text}
      </p>
      {children && (
        <div className={styles.actions}>
          {children}
        </div>
      )}
    </div>
  );
};
