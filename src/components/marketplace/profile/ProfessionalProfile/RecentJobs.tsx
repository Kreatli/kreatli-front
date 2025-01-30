import { Skeleton } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { requestProfessionalJobs } from '../../../../services/marketplace/professional';
import { Common } from '../../../../typings/common';
import { Job } from '../../../../typings/marketplace/job';
import { JobCard } from '../../jobs/JobCard';
import { EmptyState } from '../../../various/EmptyState';
import { Rating } from '../../../various/Rating';
import styles from './RecentJob.module.scss';
import { RecentJobsSkeleton } from './RecentJobsSkeleton';

interface Props {
  id: Common.Id;
}

export const RecentJobs = ({ id }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['professional', id, 'job-applications'],
    queryFn: () => requestProfessionalJobs(id),
  });

  const getCardFooter = (jobOffer: Job.Offer) => {
    const creatorReview = jobOffer.reviews.creator;

    return (
      <div className="flex flex-col">
        <p className="font-semibold">Review:</p>
        <Rating value={creatorReview?.rating} readOnly />
        <p>{creatorReview?.comment}</p>
      </div>
    );
  };

  const hasData = data && data.length > 0;
  const shouldShowEmptyState = !hasData && !isLoading;
  const shouldShowSkeleton = !hasData && isLoading;

  return (
    <>
      <h3 className="text-2xl font-semibold mt-8 mb-2">
        {!shouldShowSkeleton ? 'Recent jobs' : <Skeleton className="rounded-xl w-48 h-8" />}
      </h3>
      {shouldShowEmptyState && (
        <EmptyState title="No jobs yet" text="There are no completed jobs yet. Get back later!" />
      )}
      <div className={styles.cards}>
        {shouldShowSkeleton && <RecentJobsSkeleton />}
        {data?.map((jobOffer) => <JobCard key={jobOffer._id} jobOffer={jobOffer} footer={getCardFooter(jobOffer)} />)}
      </div>
    </>
  );
};
