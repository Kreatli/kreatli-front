import { Link } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { JOB_APPLICATION_STATUSES } from '../../../../constants/marketplace/job';
import { Common } from '../../../../typings/common';
import { Job } from '../../../../typings/marketplace/job';
import { User } from '../../../../typings/marketplace/user';
import { Alert } from '../../../various/Alert';
import { JobApplicationButtons } from './JobApplicationButtons';
import styles from './JobApplications.module.scss';

interface Props {
  professional: User.ShortInfoProfessional;
  jobOfferId: Common.Id;
  jobApplicationId: Common.Id;
  coverLetter: string;
  status: Job.Application['status'];
  jobOfferStatus: Job.Offer['status'];
  onReject?: () => void;
  onHire?: () => void;
}

export const JobApplicationContent = (props: Props) => {
  const { professional, jobOfferId, jobOfferStatus, jobApplicationId, coverLetter, status, onReject, onHire } = props;

  const isPending = status === JOB_APPLICATION_STATUSES.PENDING && jobOfferStatus !== 'canceled';

  return (
    <div className={styles.jobApplicationContent}>
      {isPending && (
        <Alert text={`${professional.name} sends a request for collaboration for this project`}>
          <JobApplicationButtons
            jobOfferId={jobOfferId}
            jobApplicationId={jobApplicationId}
            onHire={onHire}
            onReject={onReject}
          />
        </Alert>
      )}
      <p>{coverLetter}</p>
      {isPending && (
        <div>
          <Link as={NextLink} href={`/marketplace/chat/${professional._id}`}>
            Answer in chat
          </Link>
        </div>
      )}
    </div>
  );
};
