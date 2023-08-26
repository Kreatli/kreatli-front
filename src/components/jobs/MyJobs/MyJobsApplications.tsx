import { Tab, Tabs } from '@nextui-org/react';
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
      <h3 className="text-2xl font-semibold mb-4">My job applications</h3>
      <Tabs aria-label="My job applications" className="mb-4">
        <Tab key="pending" title="Pending" />
        <Tab key="hired" title="Hired" />
        <Tab key="rejected" title="Rejected" />
        <Tab key="canceled" title="Cancelled" />
      </Tabs>
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
