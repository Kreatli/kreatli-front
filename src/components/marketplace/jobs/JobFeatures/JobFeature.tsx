import React from 'react';

import { Icon, IconType } from '../../../various/Icon';
import styles from './JobFeatures.module.scss';

interface Props {
  icon: IconType;
  title: string;
}

export const JobFeature = ({ icon, title }: Props) => {
  return (
    <p className={styles.feature}>
      <Icon className={styles.icon} icon={icon} size={20} />
      {title}
    </p>
  );
};
