import cx from 'classnames';
import React from 'react';

import styles from './BottomBar.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const BottomBar = ({ children, className }: Props) => {
  return (
    <div className={cx(styles.bar, className)}>
      {children}
    </div>
  );
};
