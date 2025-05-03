import { Skeleton } from '@heroui/react';
import React from 'react';

export const ReviewToolLoading = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex-1 relative">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
