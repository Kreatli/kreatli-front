import { Skeleton } from '@nextui-org/react';
import React from 'react';

export const DashboardLeaderBoardSkeleton = () => {
  return (
    <>
      {Array.from(Array(10)).map((_, index) => (
        <Skeleton key={index} className="h-14 rounded-medium" />
      ))}
    </>
  );
};
