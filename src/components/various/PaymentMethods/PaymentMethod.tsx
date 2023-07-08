import { Text } from '@nextui-org/react';
import React from 'react';

import { Icon, IconType } from '../Icon';
import styles from './PaymentMethods.module.scss';

interface Props {
  icon: IconType;
  children: string;
}

export const PaymentMethod = ({ icon, children }: Props) => {
  return (
    <Text className={styles.method}>
      <Icon icon={icon} />
      {children}
    </Text>
  );
};
