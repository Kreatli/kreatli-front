import { Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { useQuery } from 'react-query';

import { requestCreatorJobOffers } from '../../../services/creator';
import { JobApplications } from '../JobApplications';
import { JobCard } from '../JobCard';
import styles from './MyJobs.module.scss';
import { MyJobsSkeleton } from './MyJobsSkeleton';
import { EmptyState } from '../../various/EmptyState';

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
      <Text h3>My jobs offers</Text>
      <Text color="$accents6" i>Here will be tabs displayed Posted/Ongoing/Completed/Cancelled to make it more clean and easy to use</Text>
      <Spacer />
      {shouldShowEmptyState && (
        <EmptyState
          title="No jobs yet"
          text="You didn't post any job yet. Let's fix it"
          link={{ href: '/jobs/create', label: 'Create your first job offer' }}
        />
      )}
      <div className={styles.cards}>
        {shouldShowSkeleton && <MyJobsSkeleton />}
        {data?.map((jobOffer) => (
          <div key={jobOffer._id}>
            <JobCard {...jobOffer}>
              {jobOffer.applications.length > 0 ? (
                <JobApplications jobOfferId={jobOffer._id} applications={jobOffer.applications} />
              ) : (
                <Text color="$accents6" i>There are no applications yet</Text>
              )}
            </JobCard>
          </div>
        ))}
      </div>
    </>
  );
};
