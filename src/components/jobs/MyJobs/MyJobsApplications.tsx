import { Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { useQuery } from 'react-query';

import { requestCurrentProfessionalJobs } from '../../../services/professional';
import styles from './MyJobs.module.scss';
import { MyJobsSkeleton } from './MyJobsSkeleton';
import { EmptyState } from '../../various/EmptyState';
import { MyJobsApplication } from './MyJobsApplication';

export const MyJobsApplications = () => {
  const { data, isFetching } = useQuery(['professional', 'job-applications'], () => requestCurrentProfessionalJobs(), {
    onError: () => {
      // TODO: handle error
    },
  });

  const shouldShowSkeleton = (!data || data.length === 0) && isFetching;
  const shouldShowEmptyState = data && data.length === 0 && !isFetching;

  return (
    <>
      <Text h3>My job applications</Text>
      <Text color="$accents6" i>Here will be tabs displayed Pending/Hired/Rejected/Cancelled to make it more clean and easy to use</Text>
      <Spacer />
      {shouldShowEmptyState && (
        <EmptyState
          title="No jobs yet"
          text="You didn't apply for any job yet. Let's fix it"
          link={{ href: '/jobs', label: 'Browse jobs' }}
        />
      )}
      <div className={styles.cards}>
        {shouldShowSkeleton && <MyJobsSkeleton />}
        {data?.map((jobOffer) => (
          <MyJobsApplication jobOffer={jobOffer} />
        ))}
      </div>
    </>
  );
};
