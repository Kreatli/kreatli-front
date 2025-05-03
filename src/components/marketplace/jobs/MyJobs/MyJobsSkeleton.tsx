import { Skeleton } from '@heroui/react';
import React from 'react';

export const MyJobsSkeleton = () => {
  return (
    <>
      {Array.from(Array(4)).map((_, index) => (
        <Skeleton key={index} className="h-72 sm:h-60 rounded-2xl" />
      ))}
    </>
  );
};
