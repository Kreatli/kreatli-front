import { Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { useQuery } from 'react-query';

import { requestCreatorJobOffers } from '../../../services/creator';
import styles from './MyJobs.module.scss';
import { MyJobsSkeleton } from './MyJobsSkeleton';
import { EmptyState } from '../../various/EmptyState';
import { MyJobsOffer } from './MyJobsOffer';

export const MyJobsOffers = () => {
  const { data, isFetching } = useQuery(['creator', 'job-offers'], requestCreatorJobOffers, {
    onError: () => {
      // TODO: handle error
    },
  });

  const shouldShowSkeleton = (!data || data.length === 0) && isFetching;
  const shouldShowEmptyState = data && data.length === 0 && !isFetching;

  return (
    <>
      <Text h3>My job offers</Text>
      <Text color="$accents6" i>Here will be tabs displayed Posted/Ongoing/Completed/Cancelled to make it more clean and easy to use</Text>
      <Spacer />
      {shouldShowEmptyState && (
        <EmptyState
          title="No job offers"
          text="You didn't post any job offers yet. Let's fix that!"
          link={{ href: '/jobs/create', label: 'Create your first job offer' }}
        />
      )}
      <div className={styles.cards}>
        {shouldShowSkeleton && <MyJobsSkeleton />}
        {data?.map((jobOffer) => (
          <MyJobsOffer jobOffer={jobOffer} />
        ))}
      </div>
    </>
  );
};
