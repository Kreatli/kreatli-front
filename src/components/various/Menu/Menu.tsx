import React from 'react';

import styles from './Menu.module.scss';
import { MenuGroup } from './MenuGroup';
import { MenuItem } from './MenuItem';

interface Props {
  children: React.ReactNode;
}

const Menu = ({ children }: Props) => {
  return <div className={styles.menu}>{children}</div>;
};

Menu.Group = MenuGroup;
Menu.Item = MenuItem;

export { Menu };
