import { Text } from '@nextui-org/react';
import React from 'react';
import { useQuery } from 'react-query';

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

  const { data } = useQuery(['job-offer', id, 'others'], fetchJobOfferOthers, { staleTime: Infinity });

  if (!data || !data.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Text h4>Other job offers from {creatorName}</Text>
      <div className={styles.cards}>
        {data.map((jobOffer) => (
          <JobCard key={jobOffer._id} {...jobOffer} />
        ))}
      </div>
    </div>
  );
};
