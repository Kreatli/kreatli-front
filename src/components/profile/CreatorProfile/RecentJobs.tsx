import React from 'react';
import { useQuery } from 'react-query';
import { requestCreatorJobs } from '../../../services/creator';
import { JobCard } from '../../jobs/JobCard';

import { RecentJobsSkeleton } from './RecentJobsSkeleton';
import { EmptyState } from '../../various/EmptyState';
import { Common } from '../../../typings/common';

interface Props {
  id: Common.Id;
}

export const RecentJobs = ({ id }: Props) => {
  const { data, isLoading } = useQuery(['creator', id, 'job-offers'], () => requestCreatorJobs(id));

  const hasData = data && data.length > 0;
  const shouldShowEmptyState = !hasData && !isLoading;
  const shouldShowSkeleton = !hasData && isLoading;

  return (
    <>
      <h3 className="text-2xl font-semibold mt-8 mb-2">Recent jobs</h3>
      {shouldShowEmptyState && (
        <EmptyState
          title="No jobs yet"
          text="There are no posted jobs yet. Get back later!"
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       {shouldShowSkeleton && <RecentJobsSkeleton />}
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
