import React from 'react';

import { Skeleton } from '../../various/Skeleton/Skeleton';

export const RecentJobsSkeleton = () => {
  return (
    <>
      {Array.from(Array(2)).map((_, index) => (
        <Skeleton key={index} aspectRatio={5} />
      ))}
    </>
  );
};
