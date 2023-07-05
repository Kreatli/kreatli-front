import { Text } from '@nextui-org/react';
import React from 'react';

import { Icon, IconType } from '../../various/Icon';
import styles from './JobCard.module.scss';

interface Props {
  icon: IconType;
  title: string;
}

export const JobCardFeature = ({ icon, title }: Props) => {
  return (
    <Text color="$accents6" className={styles.feature}>
      <Icon className={styles.icon} icon={icon} size={20} />
      {title}
    </Text>
  );
};
