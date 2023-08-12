import React from 'react';
import { Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { requestCreatorJobs } from '../../../services/creator';
import { useSession } from '../../../hooks/useSession';
import { JobCard } from '../../jobs/JobCard';

import styles from './RecentJob.module.scss';
import { RecentJobsSkeleton } from './RecentJobsSkeleton';
import { EmptyState } from '../../various/EmptyState';

export const RecentJobs = () => {
  const { currentUserId } = useSession();
  const { data, isLoading } = useQuery(['creator', currentUserId, 'job-offers'], () => requestCreatorJobs());

  const hasData = data && data.length > 0;
  const shouldShowEmptyState = !hasData && !isLoading;
  const shouldShowSkeleton = !hasData && isLoading;

  return (
    <>
      <Text h3>Recent jobs</Text>
      {shouldShowEmptyState && (
        <EmptyState
          title="No jobs yet"
          text="There are no posted jobs yet. Get back later!"
        />
      )}
      <div className={styles.cards}>
       {shouldShowSkeleton && <RecentJobsSkeleton />}
        {data?.map((jobOffer) => (
          <JobCard
            hideCreator
            jobOffer={jobOffer}
          />
        ))}
      </div>
    </>
  );
};
