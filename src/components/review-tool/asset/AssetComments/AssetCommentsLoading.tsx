import { Skeleton } from '@heroui/react';
import React from 'react';

export const AssetCommentsLoading = () => {
  return (
    <div className="p-3 pt-0 pb-9 flex flex-col gap-2">
      <div className="text-medium">
        <Skeleton className="h-6 w-32 rounded-lg" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
            <Skeleton className="h-16 w-full rounded-lg" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-lg" />
              <Skeleton className="h-6 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
