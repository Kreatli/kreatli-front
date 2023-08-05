import { Badge, Text } from '@nextui-org/react';
import React from 'react';

import { JobApplications } from '../JobApplications';
import { JobCard } from '../JobCard';
import { JOB_OFFER_STATUS_COLORS, JOB_OFFER_STATUS_LABELS } from '../../../constants/job';
import { Job } from '../../../typings/job';

interface Props {
  jobOffer: Job.Offer;
}

export const MyJobsOffer = ({ jobOffer }: Props) => {
  const cardHeader = (
    <Badge
      variant="flat"
      isSquared
      color={JOB_OFFER_STATUS_COLORS[jobOffer.status]}
    >
      {JOB_OFFER_STATUS_LABELS[jobOffer.status]}
    </Badge>
  );

  const cardFooter = (
    jobOffer.applications.length > 0
      ? <JobApplications jobOfferId={jobOffer._id} applications={jobOffer.applications} />
      : <Text color="$accents6" i>There are no applications yet</Text>
  );

  return (
    <JobCard
      jobOffer={jobOffer}
      hideCreator
      header={cardHeader}
      footer={cardFooter}
    />
  );
};
