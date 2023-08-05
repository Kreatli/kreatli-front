import { Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { useQuery } from 'react-query';

import { requestProfessionalJobApplications } from '../../../services/professional';
import { JobCard } from '../JobCard';
import styles from './MyJobs.module.scss';
import { MyJobsSkeleton } from './MyJobsSkeleton';

export const MyJobsApplications = () => {
  const { data, isFetching } = useQuery(['professional', 'jobApplications'], requestProfessionalJobApplications, {
    onError: () => {
      // TODO: handle error
    },
  });

  const shouldShowSkeleton = (!data || data.length === 0) && isFetching;

  return (
    <>
      <Text h3>My jobs applications</Text>
      <Text color="$accents6" i>Here will be tabs displayed Pending/Hired/Rejected/Cancelled to make it more clean and easy to use</Text>
      <Spacer />
      <div className={styles.cards}>
        {shouldShowSkeleton && <MyJobsSkeleton />}
        {data?.map((jobOffer) => (
          <div key={jobOffer._id}>
            <JobCard {...jobOffer} jobApplicationStatus={jobOffer.applications[0].status}>
              <Text>{jobOffer.applications[0].coverLetter}</Text>
            </JobCard>
          </div>
        ))}
      </div>
    </>
  );
};
