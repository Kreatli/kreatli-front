import { Button, Text } from '@nextui-org/react';
import React from 'react';

import { Icon, IconType } from '../Icon';
import styles from './EmptyState.module.scss';
import Link from 'next/link';

const DEFAULT_TITLE = 'No results';
const DEFAULT_TEXT = 'Oops! No results found. Try different criteria or check back later, we\'re growing 🚀';

interface Props {
  title?: string;
  text?: string;
  icon?: IconType;
  link?: {
    href: string;
    label: string;
  };
}

export const EmptyState = ({ title = DEFAULT_TITLE, icon = 'emojiSad', text = DEFAULT_TEXT, link }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Icon icon={icon} size={36} className={styles.icon} />
      <Text h4>{title}</Text>
      <Text>{text}</Text>
      {link && (
        <Button as={Link} href={link.href} color="secondary" flat className={styles.button}>{link.label}</Button>
      )}
    </div>
  );
};
