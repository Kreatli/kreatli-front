import { Text } from '@nextui-org/react';
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
      <Text className={styles.text}>
        <Icon icon="logo" size={20} className={styles.icon} />
        {text}
      </Text>
      <div className={styles.actions}>
        {children}
      </div>
    </div>
  );
};
