import { Skeleton } from '@heroui/react';
import React from 'react';

export const JobsListingSkeleton = () => {
  return (
    <>
      {Array.from(Array(4)).map((_, index) => (
        <Skeleton key={index} className="h-72 sm:h-52 rounded-2xl" />
      ))}
    </>
  );
};
