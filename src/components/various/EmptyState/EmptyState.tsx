import { Button } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { Icon, IconType } from '../Icon';
import styles from './EmptyState.module.scss';

interface Props {
  title: string;
  text?: string;
  icon?: IconType;
  link?: {
    href: string;
    label: string;
    onClick?: () => void;
  };
  children?: React.ReactNode;
}

export const EmptyState = ({ title, icon = 'inbox', text, link, children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Icon icon={icon} size={36} className={styles.icon} />
      <h4 className="text-xl font-semibold my-2">{title}</h4>
      {text && <p>{text}</p>}
      {link && (
        <Button
          as={NextLink}
          href={link.href}
          color="secondary"
          variant="flat"
          className={styles.button}
          onClick={link.onClick}
        >
          {link.label}
        </Button>
      )}
      {children}
    </div>
  );
};
