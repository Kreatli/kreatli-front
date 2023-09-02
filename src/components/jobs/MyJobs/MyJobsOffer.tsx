import { Button, Chip, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react';
import React from 'react';

import { JobApplications } from '../JobApplications';
import { JobCard } from '../JobCard';
import { JOB_OFFER_STATUS_COLORS, JOB_OFFER_STATUS_LABELS } from '../../../constants/job';
import { Job } from '../../../typings/job';
import { useMutation } from 'react-query';
import { requestJobOfferCancel } from '../../../services/job';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useNotifications } from '../../../hooks/useNotifications';
import { Icon } from '../../various/Icon';
import { JobReviewModal } from '../JobReviewModal';
import { Rating } from '../../various/Rating';

interface Props {
  jobOffer: Job.Offer;
  onHire?: () => void;
  onReject?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
}

export const MyJobsOffer = ({ jobOffer, onCancel, onComplete, onHire, onReject }: Props) => {
  const isPosted = jobOffer.status === 'posted';
  const isOngoing = jobOffer.status === 'ongoing';
  const isCompleted = jobOffer.status === 'completed';
  const hasLeftReview = !!jobOffer.reviews.creator;
  const professionalReview = jobOffer.reviews.professional;
  const hiredProfessional = jobOffer.applications.find(({ professional }) => professional._id === jobOffer.hiredProfessional)?.professional;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pushNotification } = useNotifications();

  const { mutate: mutateCancel, isLoading: isCanceling } = useMutation(requestJobOfferCancel, {
    onSuccess: () => {
      onCancel?.();
      pushNotification({
        message: 'The job posting was cancelled',
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
    if (isPosted) {
      return mutateCancel(jobOffer._id);
    }

    onOpen();
  };

  const dropdownMenu = [
    ...(isPosted ? [{
      label: 'Cancel job posting',
      icon: 'cross' as const,
      color: 'danger' as const,
    }] : []),
    ...(isOngoing ? [{
      label: 'Finish collaboration',
      icon: 'check' as const,
      color: 'default' as const,
    }] : []),
    ...((isCompleted && !hasLeftReview) ? [{
      label: 'Leave feedback',
      size: 18,
      icon: 'chat' as const,
      color: 'default' as const,
    }] : []),
  ];

  const cardHeader = (
    <div className="flex items-center justify-between h-[32px] -mt-2">
      <Chip
        variant="flat"
        size="sm"
        radius="sm"
        color={JOB_OFFER_STATUS_COLORS[jobOffer.status]}
      >
        {JOB_OFFER_STATUS_LABELS[jobOffer.status]}
      </Chip>
      {dropdownMenu.length > 0 && (
        <Dropdown isDisabled={isCanceling}>
          <DropdownTrigger>
            <Button aria-label="Job posting settings" variant="flat" radius="full" size="sm" isIconOnly>
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
    <div className="flex flex-col w-full">
      {jobOffer.applications.length > 0
        ? (
          <JobApplications
            jobOfferId={jobOffer._id}
            jobOfferStatus={jobOffer.status}
            applications={jobOffer.applications}
            onHire={onHire}
            onReject={onReject}
          />
        )
        : <p className="italic text-gray-600">There are no applications yet</p>}
      {professionalReview && (
        <div>
          <Divider className="mb-2" />
          <p className="font-semibold">Review from {hiredProfessional?.name}:</p>
          <Rating value={professionalReview.rating} readOnly />
          <p>{professionalReview.comment}</p>
        </div>
      )}
    </div>
  );

  const shouldShowReviewModal = isOngoing || (isCompleted && !hasLeftReview);

  return (
    <>
      <JobCard
        jobOffer={jobOffer}
        hideCreator
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
