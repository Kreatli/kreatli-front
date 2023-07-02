import React from 'react';

import styles from './Skeleton.module.scss';

interface Props {
  aspectRatio?: number;
}

export const Skeleton = ({ aspectRatio }: Props) => {
  const style = React.useMemo(() => ({
    ...(aspectRatio && { aspectRatio }),
  }), [aspectRatio]);

  return (
    <div className={styles.skeleton} style={style} />
  );
};
