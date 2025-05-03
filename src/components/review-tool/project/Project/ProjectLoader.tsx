import { Skeleton } from '@heroui/react';
import React from 'react';

export const ProjectLoader = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-lg" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    </div>
  );
};
