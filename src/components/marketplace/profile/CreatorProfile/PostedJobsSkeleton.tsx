import { Skeleton } from '@heroui/react';
import React from 'react';

export const PostedJobsSkeleton = () => {
  return (
    <>
      {Array.from(Array(2)).map((_, index) => (
        <Skeleton key={index} className="h-52 rounded-2xl" />
      ))}
    </>
  );
};
