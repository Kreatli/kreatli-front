import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { requestCreatorJobs } from '../../../services/creator';
import { Common } from '../../../typings/common';
import { JobCard } from '../../jobs/JobCard';
import { EmptyState } from '../../various/EmptyState';
import { PostedJobsSkeleton } from './PostedJobsSkeleton';

interface Props {
  id: Common.Id;
}

export const PostedJobs = ({ id }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['creator', id, 'job-offers'],
    queryFn: () => requestCreatorJobs(id),
  });

  const hasData = data && data.length > 0;
  const shouldShowEmptyState = !hasData && !isLoading;
  const shouldShowSkeleton = !hasData && isLoading;

  return (
    <>
      <h3 className="text-2xl font-semibold mt-8 mb-2">Posted jobs</h3>
      {shouldShowEmptyState && (
        <EmptyState
          title="No jobs yet"
          text="There are no posted jobs yet. Get back later!"
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shouldShowSkeleton && <PostedJobsSkeleton />}
        {data?.map((jobOffer) => (
          <JobCard
            key={jobOffer._id}
            hideCreator
            jobOffer={jobOffer}
          />
        ))}
      </div>
    </>
  );
};
