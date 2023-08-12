import React from 'react';
import { Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { useSession } from '../../../hooks/useSession';
import { JobCard } from '../../jobs/JobCard';

import styles from './RecentJob.module.scss';
import { requestProfessionalJobs } from '../../../services/professional';
import { Job } from '../../../typings/job';
import { Rating } from '../../various/Rating';

export const RecentJobs = () => {
  const { currentUserId } = useSession();
  const { data } = useQuery(['professional', currentUserId, 'job-offers'], () => requestProfessionalJobs());

  const getCardFooter = (jobOffer: Job.Offer) => {
    const [creatorReview] = jobOffer.reviews;

    return (
      <>
        <Text weight="semibold">Review:</Text>
        <Rating value={creatorReview?.rating} readOnly />
        <Text>{creatorReview?.comment}</Text>
      </>
    );
  };

  return (
    <>
      <Text h3>Recent jobs</Text>
      <div className={styles.cards}>
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
