import { Link } from '@heroui/react';
import NextLink from 'next/link';
import React from 'react';

import { JOB_APPLICATION_STATUSES } from '../../../../constants/marketplace/job';
import { ChatContext } from '../../../../contexts/marketplace/Chat';
import { useSession } from '../../../../hooks/marketplace/useSession';
import { Chat } from '../../../../typings/marketplace/chat';
import { Alert } from '../../../various/Alert';
import { Icon } from '../../../various/Icon';
import { JobApplicationButtons } from '../../jobs/JobApplications/JobApplicationButtons';

interface Props {
  message: Chat.SystemMessage;
}

export const SystemMessage = ({ message }: Props) => {
  const {
    type,
    sender,
    data: { jobOfferId, jobApplicationId, jobOfferTitle, jobApplicationStatus },
  } = message;
  const { currentUserId } = useSession();
  const { participant, loadInitialMessages } = React.useContext(ChatContext);
  const isCurrentUserSender = sender === currentUserId;

  const offerLink = React.useMemo(
    () => (
      <Link
        as={NextLink}
        size="sm"
        color="secondary"
        className="font-semibold"
        underline="hover"
        href={`/marketplace/jobs/${jobOfferId}`}
      >
        {jobOfferTitle}
      </Link>
    ),
    [jobOfferId, jobOfferTitle],
  );

  const alertText = React.useMemo(() => {
    if (type === 'requestJob') {
      if (isCurrentUserSender) {
        return <span>You applied for {offerLink}</span>;
      }

      return (
        <span>
          {participant?.name} applied for {offerLink}
        </span>
      );
    }

    if (type === 'acceptJob') {
      if (isCurrentUserSender) {
        return (
          <span>
            You hired {participant?.name} for {offerLink}
          </span>
        );
      }

      return (
        <span>
          {participant?.name} accepted your job application for {offerLink}
        </span>
      );
    }

    if (type === 'rejectJob') {
      if (isCurrentUserSender) {
        return <span>You rejected the job application for {offerLink}</span>;
      }

      return (
        <span>
          {participant?.name} rejected your job application for {offerLink}
        </span>
      );
    }

    if (type === 'endJob') {
      if (isCurrentUserSender) {
        return <span>You finished the collaboration for {offerLink}</span>;
      }

      return (
        <span>
          {participant?.name} finished the collaboration for {offerLink}
        </span>
      );
    }

    return 'alert text';
  }, [isCurrentUserSender, offerLink, participant?.name, type]);

  const alertActions = React.useMemo(() => {
    if (type !== 'requestJob') {
      return null;
    }

    if (jobApplicationStatus === JOB_APPLICATION_STATUSES.PENDING && !isCurrentUserSender) {
      return (
        <JobApplicationButtons
          jobOfferId={jobOfferId}
          jobApplicationId={jobApplicationId}
          onHire={loadInitialMessages}
          onReject={loadInitialMessages}
        />
      );
    }

    if (jobApplicationStatus === JOB_APPLICATION_STATUSES.HIRED) {
      return (
        <span className="flex gap-1 text-sm text-success-500">
          <Icon icon="checkCircle" size={18} />
          Hired
        </span>
      );
    }

    if (jobApplicationStatus === JOB_APPLICATION_STATUSES.REJECTED) {
      return (
        <span className="flex gap-1 text-sm text-danger-400">
          <Icon icon="crossCircle" size={18} />
          Rejected
        </span>
      );
    }

    if (jobApplicationStatus === JOB_APPLICATION_STATUSES.CANCELED) {
      return (
        <span className="flex gap-1 text-sm text-default-400">
          <Icon icon="crossCircle" size={18} />
          Cancelled
        </span>
      );
    }
  }, [type, jobApplicationStatus, isCurrentUserSender, jobOfferId, jobApplicationId, loadInitialMessages]);

  return (
    <div className="md:px-10 mx-auto">
      <Alert text={alertText} width="auto">
        {alertActions}
      </Alert>
    </div>
  );
};
