import { Button, cn } from '@heroui/react';
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
  size?: 'sm' | 'md';
}

export const EmptyState = ({ title, icon = 'inbox', size = 'md', text, link, children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Icon icon={icon} size={size === 'sm' ? 36 : 48} className={styles.icon} />
      <h4 className={cn('text-xl font-semibold my-2', size === 'sm' && 'text-lg')}>{title}</h4>
      {text && <p className={cn(size === 'sm' && 'text-sm')}>{text}</p>}
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
