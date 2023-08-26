import React from 'react';
import { useQuery } from 'react-query';
import { JobCard } from '../../jobs/JobCard';

import styles from './RecentJob.module.scss';
import { requestProfessionalJobs } from '../../../services/professional';
import { Job } from '../../../typings/job';
import { Rating } from '../../various/Rating';
import { RecentJobsSkeleton } from './RecentJobsSkeleton';
import { EmptyState } from '../../various/EmptyState';
import { Common } from 'typings/common';

interface Props {
  id: Common.Id;
}

export const RecentJobs = ({ id }: Props) => {
  const { data, isLoading } = useQuery(['professional', id, 'job-offers'], () => requestProfessionalJobs(id));

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
      <h3 className="text-2xl font-semibold mt-8 mb-2">Recent jobs</h3>
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
