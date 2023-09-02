import { Button, Chip, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react';
import { useMutation } from 'react-query';
import React from 'react';

import { JobCard } from '../JobCard';
import { JOB_APPLICATION_STATUS_COLORS, JOB_APPLICATION_STATUS_LABELS, JOB_OFFER_STATUS_COLORS, JOB_OFFER_STATUS_LABELS } from '../../../constants/job';
import { Job } from '../../../typings/job';
import { Icon } from '../../various/Icon';
import { useNotifications } from '../../../hooks/useNotifications';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { requestJobApplicationCancel } from '../../../services/job';
import { JobReviewModal } from '../JobReviewModal';
import { Rating } from '../../various/Rating';
import { useSession } from '../../../hooks/useSession';

interface Props {
  jobOffer: Job.Offer;
  onCancel?: () => void;
  onComplete?: () => void;
}

export const MyJobsApplication = ({ jobOffer, onCancel, onComplete }: Props) => {
  const [jobApplication] = jobOffer.applications;
  const { currentUserId } = useSession();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isHired = jobApplication.status === 'hired';
  const isCompleted = jobOffer.status === 'completed';
  const isOngoing = jobOffer.status === 'ongoing';
  const isCurrentUserHired = jobOffer.hiredProfessional === currentUserId;
  const hasLeftReview = !!jobOffer.reviews.professional;

  const pushNotification = useNotifications((state) => state.pushNotification);
  const { mutate: mutateCancel, isLoading: isCanceling } = useMutation(requestJobApplicationCancel, {
    onSuccess: () => {
      onCancel?.();
      pushNotification({
        message: 'The application was cancelled',
        color: 'success',
        icon: 'success',
      });
    },
    onError: (error: any) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const handleAction = () => {
    if (isPending) {
      return mutateCancel([jobOffer._id, jobApplication._id]);
    }

    onOpen();
  };

  const isPending = jobApplication.status === 'pending';

  const dropdownMenu = [
    ...(isPending ? [{
      label: 'Cancel application',
      icon: 'cross' as const,
      color: 'danger' as const,
    }] : []),
    ...(isOngoing && isCurrentUserHired ? [{
      label: 'Finish collaboration',
      icon: 'check' as const,
      color: 'default' as const,
    }] : []),
    ...(isCompleted && !hasLeftReview && isCurrentUserHired ? [{
      label: 'Leave feedback',
      size: 18,
      icon: 'chat' as const,
      color: 'default' as const,
    }] : []),
  ];

  const creatorReview = jobOffer.reviews.creator;
  const chipColor = isHired ? JOB_OFFER_STATUS_COLORS[jobOffer.status] : JOB_APPLICATION_STATUS_COLORS[jobApplication.status];
  const chipLabel = isHired ? JOB_OFFER_STATUS_LABELS[jobOffer.status] : JOB_APPLICATION_STATUS_LABELS[jobApplication.status];

  const cardHeader = (
    <div className="flex items-center justify-between h-[32px] -mt-2 mb-2">
      <Chip
        radius="sm"
        size="sm"
        variant="flat"
        color={chipColor}
      >
        {chipLabel}
      </Chip>
      {dropdownMenu.length > 0 && (
        <Dropdown isDisabled={isCanceling}>
          <DropdownTrigger>
            <Button aria-label="Job application options" variant="light" radius="full" size="sm" isIconOnly>
              <Icon icon="dots" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={handleAction}>
            {dropdownMenu.map(({ icon, color, label, size }) => (
              <DropdownItem key={label} startContent={<Icon icon={icon} size={size} />} color={color}>{label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );

  const cardFooter = (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-semibold">Cover letter:</p>
        <p>{jobApplication.coverLetter}</p>
      </div>
      {creatorReview && isCurrentUserHired && (
        <div>
          <p className="font-semibold">Review from {jobOffer.creator.name}:</p>
          <Rating value={creatorReview.rating} readOnly />
          <p>{creatorReview.comment}</p>
        </div>
      )}
    </div>
  );

  const shouldShowReviewModal = (isOngoing || (isCompleted && !hasLeftReview)) && isCurrentUserHired;

  return (
    <>
      <JobCard
        jobOffer={jobOffer}
        header={cardHeader}
        footer={cardFooter}
      />
      {shouldShowReviewModal && (
        <JobReviewModal
          isOpen={isOpen}
          jobOfferId={jobOffer._id}
          jobOfferStatus={jobOffer.status}
          onClose={onClose}
          onSuccess={onComplete}
        />
      )}
    </>
  );
};
