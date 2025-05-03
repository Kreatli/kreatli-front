import { Skeleton } from '@heroui/react';
import React from 'react';

export const DashboardTasksTrackerSkeleton = () => {
  return (
    <>
      {Array.from(Array(10)).map((_, index) => (
        <Skeleton key={index} className="h-14 rounded-medium" />
      ))}
    </>
  );
};
