import { Text } from '@nextui-org/react';
import React from 'react';

import { Icon, IconType } from '../Icon';
import styles from './EmptyState.module.scss';

const DEFAULT_TITLE = 'No results';
const DEFAULT_TEXT = 'Oops! No results found. Try different criteria or check back later, we\'re growing 🚀';

interface Props {
  title?: string;
  text?: string;
  icon?: IconType;
}

export const EmptyState = ({ title = DEFAULT_TITLE, icon = 'emojiSad', text = DEFAULT_TEXT }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Icon icon={icon} size={36} />
      <Text h4>{title}</Text>
      <Text>
        {text}
      </Text>
    </div>
  );
};
