import { Skeleton } from '@nextui-org/react';
import React from 'react';

export const RecentJobsSkeleton = () => {
  return (
    <>
      {Array.from(Array(2)).map((_, index) => (
        <Skeleton key={index} className="h-80 sm:h-64 rounded-2xl" />
      ))}
    </>
  );
};
