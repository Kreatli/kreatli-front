import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { useQuery } from 'react-query';

import { requestCurrentCreatorJobs } from '../../../services/creator';
import styles from './MyJobs.module.scss';
import { MyJobsSkeleton } from './MyJobsSkeleton';
import { EmptyState } from '../../various/EmptyState';
import { MyJobsOffer } from './MyJobsOffer';

export const MyJobsOffers = () => {
  const { data, isFetching } = useQuery(['creator', 'job-offers'], () => requestCurrentCreatorJobs(), {
    onError: () => {
      // TODO: handle error
    },
  });

  const shouldShowSkeleton = (!data || data.length === 0) && isFetching;
  const shouldShowEmptyState = data && data.length === 0 && !isFetching;

  return (
    <>
      <h3 className="text-2xl font-semibold mb-4">My job offers</h3>
      <Tabs aria-label="My job offers" className="mb-4">
        <Tab key="posted" title="Posted" />
        <Tab key="ongoing" title="Ongoing" />
        <Tab key="completed" title="Completed" />
        <Tab key="canceled" title="Cancelled" />
      </Tabs>
      {shouldShowEmptyState && (
        <EmptyState
          title="No job offers"
          text="You don't have any posted jobs. Let's fix that!"
          link={{ href: '/jobs/create', label: 'Create your first job offer' }}
        />
      )}
      <div className={styles.cards}>
        {shouldShowSkeleton && <MyJobsSkeleton />}
        {data?.map((jobOffer) => (
          <MyJobsOffer key={jobOffer._id} jobOffer={jobOffer} />
        ))}
      </div>
    </>
  );
};
