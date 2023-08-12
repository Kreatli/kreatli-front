import React from 'react';
import { Text } from '@nextui-org/react';
import { useQuery } from 'react-query';
import { requestCreatorJobs } from '../../../services/creator';
import { useSession } from '../../../hooks/useSession';
import { JobCard } from '../../jobs/JobCard';

import styles from './RecentJob.module.scss';

export const RecentJobs = () => {
  const { currentUserId } = useSession();
  const { data } = useQuery(['creator', currentUserId, 'job-offers'], () => requestCreatorJobs());

  return (
    <>
      <Text h3>Recent jobs</Text>
      <div className={styles.cards}>
        {data?.map((jobOffer) => (
          <JobCard
            hideCreator
            jobOffer={jobOffer}
          />
        ))}
      </div>
    </>
  );
};
