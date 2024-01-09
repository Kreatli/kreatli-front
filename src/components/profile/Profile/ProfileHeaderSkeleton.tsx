import { Skeleton } from '@nextui-org/react';
import React from 'react';

export const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex items-center gap-6 sm:gap-10">
      <Skeleton className="rounded-full w-24 h-24 sm:w-28 sm:h-28" />
      <div className="flex-1 grid gap-2">
        <Skeleton className="rounded-xl h-8 w-48 sm:w-64" />
        <Skeleton className="rounded-xl h-4 w-32" />
      </div>
      <Skeleton className="rounded-2xl h-10 w-10 sm:w-32" />
    </div>
  );
};
