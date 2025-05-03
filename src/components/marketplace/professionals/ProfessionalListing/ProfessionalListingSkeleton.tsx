import { Skeleton } from '@heroui/react';
import React from 'react';

export const ProfessionalListingSkeleton = () => {
  return (
    <>
      {Array.from(Array(8)).map((_, index) => (
        <Skeleton key={index} className="aspect-[2/3] rounded-2xl" />
      ))}
    </>
  );
};
