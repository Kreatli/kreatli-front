import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { requestJobOfferOthers } from '../../../services/job';
import { Common } from '../../../typings/common';
import { JobCard } from '../JobCard';
import styles from './JobOthers.module.scss';

interface Props {
  id: Common.MaybeId;
  creatorName: string;
}

export const JobOthers = ({ id, creatorName }: Props) => {
  const fetchJobOfferOthers = () => {
    if (!id) {
      return;
    }

    return requestJobOfferOthers(id);
  };

  const { data } = useQuery({
    queryFn: fetchJobOfferOthers,
    queryKey: ['job-offer', id, 'others'],
    staleTime: Infinity,
  });

  if (!data || !data.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <h4 className="text-xl font-semibold mt-8 mb-2">Other job postings from {creatorName}</h4>
      <div className={styles.cards}>
        {data.map((jobOffer) => (
          <JobCard key={jobOffer._id} jobOffer={jobOffer} />
        ))}
      </div>
    </div>
  );
};
