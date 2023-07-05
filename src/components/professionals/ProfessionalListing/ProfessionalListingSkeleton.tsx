import React from 'react';

import { Skeleton } from '../../various/Skeleton/Skeleton';

export const ProfessionalListingSkeleton = () => {
  return (
    <>
      {Array.from(Array(8)).map((_, index) => (
        <Skeleton key={index} aspectRatio={0.65} />
      ))}
    </>
  );
};
