import { Skeleton } from '@nextui-org/react';
import React from 'react';

export const ConnectionsSkeleton = () => {
  return (
    <>
      {Array.from(Array(12)).map((_, index) => (
        <Skeleton key={index} className="h-24 rounded-2xl" />
      ))}
    </>
  );
};
