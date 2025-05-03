import { Skeleton } from '@heroui/react';
import React from 'react';

import { Icon } from '../../../../various/Icon';

export const ProjectFolderAssetsLoading = () => {
  return (
    <div>
      <div className="flex items-center gap-0.5 text-foreground-500 mb-4">
        <Icon icon="arrowLeft" size={18} />
        <Skeleton className="h-4 w-24 rounded" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-32 rounded" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </div>
          <div>
            <Skeleton className="h-10 w-24 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-video rounded-lg" />
              <Skeleton className="h-6 w-1/2 rounded" />
              <Skeleton className="size-10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
