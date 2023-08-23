import React from 'react';

import styles from './Menu.module.scss';

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const MenuGroup = ({ children, title }: Props) => {
  return (
    <div className={styles.group}>
      {title && <h5 className="text-md font-semibold m-0">{title}</h5>}
      {children}
    </div>
  );
};
