import React from 'react';

import { Skeleton } from '../../various/Skeleton/Skeleton';

export const MyJobsSkeleton = () => {
  return (
    <>
      {Array.from(Array(4)).map((_, index) => (
        <Skeleton key={index} aspectRatio={5} />
      ))}
    </>
  );
};
