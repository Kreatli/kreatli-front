import { Skeleton } from '@heroui/react';
import React from 'react';

export const ChatListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from(Array(8)).map((_, index) => (
        <Skeleton key={index} className="h-28 rounded-2xl" />
      ))}
    </div>
  );
};
