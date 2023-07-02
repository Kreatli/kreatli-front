import { Text } from '@nextui-org/react';
import React from 'react';

import styles from './Menu.module.scss';

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const MenuGroup = ({ children, title }: Props) => {
  return (
    <div className={styles.group}>
      {title && <Text h5 css={{ margin: 0 }}>{title}</Text>}
      {children}
    </div>
  );
};
