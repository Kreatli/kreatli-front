import React from 'react';
import { Grid, Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { useSession } from '../../../hooks/useSession';
import { JobCard } from '../../jobs/JobCard';

import styles from './RecentJob.module.scss';
import { requestProfessionalJobs } from '../../../services/professional';
import { Job } from '../../../typings/job';
import { Rating } from '../../various/Rating';
import { RecentJobsSkeleton } from './RecentJobsSkeleton';
import { EmptyState } from '../../various/EmptyState';

export const RecentJobs = () => {
  const { currentUserId } = useSession();
  const { data, isLoading } = useQuery(['professional', currentUserId, 'job-offers'], () => requestProfessionalJobs());

  const getCardFooter = (jobOffer: Job.Offer) => {
    const [creatorReview] = jobOffer.reviews;

    return (
      <Grid.Container direction="column">
        <Text weight="semibold">Review:</Text>
        <Rating value={creatorReview?.rating} readOnly />
        <Text>{creatorReview?.comment}</Text>
      </Grid.Container>
    );
  };

  const hasData = data && data.length > 0;
  const shouldShowEmptyState = !hasData && !isLoading;
  const shouldShowSkeleton = !hasData && isLoading;

  return (
    <>
      <Text h3>Recent jobs</Text>
      {shouldShowEmptyState && (
        <EmptyState
          title="No jobs yet"
          text="There are no completed jobs yet. Get back later!"
        />
      )}
      <div className={styles.cards}>
        {shouldShowSkeleton && <RecentJobsSkeleton />}
        {data?.map((jobOffer) => (
          <JobCard
            jobOffer={jobOffer}
            footer={getCardFooter(jobOffer)}
            hideApply
          />
        ))}
      </div>
    </>
  );
};
