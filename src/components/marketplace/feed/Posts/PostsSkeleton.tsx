import { Skeleton } from '@nextui-org/react';
import React from 'react';

export const PostsSkeleton = () => {
  return (
    <>
      {Array.from(Array(4)).map((_, index) => (
        <Skeleton key={index} className="rounded-2xl h-96" />
      ))}
    </>
  );
};
