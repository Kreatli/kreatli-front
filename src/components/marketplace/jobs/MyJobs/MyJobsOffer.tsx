import {
  Button,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { JOB_OFFER_STATUS_COLORS, JOB_OFFER_STATUS_LABELS } from '../../../../constants/marketplace/job';
import { useNotifications } from '../../../../hooks/useNotifications';
import { requestJobOfferCancel } from '../../../../services/marketplace/job';
import { Job } from '../../../../typings/marketplace/job';
import { getErrorMessage } from '../../../../utils/marketplace/getErrorMessage';
import { Icon } from '../../../various/Icon';
import { Rating } from '../../../various/Rating';
import { JobApplications } from '../JobApplications';
import { JobCard } from '../JobCard';
import { JobReviewModal } from '../JobReviewModal';

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
  const hiredApplication = jobOffer.applications.find(
    ({ professional }) => professional._id === jobOffer.hiredProfessional,
  );
  const hiredProfessional = hiredApplication?.professional;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pushNotification } = useNotifications();

  const { mutate: mutateCancel, isPending: isCanceling } = useMutation({
    mutationFn: requestJobOfferCancel,
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
    ...(isPosted
      ? [
          {
            label: 'Cancel job posting',
            icon: 'cross' as const,
            className: 'text-danger',
            color: 'danger' as const,
          },
        ]
      : []),
    ...(isOngoing
      ? [
          {
            label: 'Finish collaboration',
            icon: 'check' as const,
            color: 'default' as const,
          },
        ]
      : []),
    ...(isCompleted && !hasLeftReview
      ? [
          {
            label: 'Leave feedback',
            size: 18,
            icon: 'chat' as const,
            color: 'default' as const,
          },
        ]
      : []),
  ];

  const cardHeader = (
    <div className="flex items-center justify-between h-[32px] -mt-2">
      <Chip variant="flat" size="sm" radius="sm" color={JOB_OFFER_STATUS_COLORS[jobOffer.status]}>
        {JOB_OFFER_STATUS_LABELS[jobOffer.status]}
      </Chip>
      {dropdownMenu.length > 0 && (
        <Dropdown isDisabled={isCanceling}>
          <DropdownTrigger>
            <Button aria-label="Job posting settings" variant="flat" radius="full" size="sm" isIconOnly>
              <Icon icon="dots" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="flat" onAction={handleAction}>
            {dropdownMenu.map(({ icon, color, label, size, className }) => (
              <DropdownItem
                key={label}
                className={className}
                startContent={<Icon icon={icon} size={size} />}
                color={color}
              >
                {label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );

  const cardFooter = (
    <div className="flex flex-col w-full">
      {jobOffer.applications.length > 0 ? (
        <JobApplications
          jobOfferId={jobOffer._id}
          jobOfferStatus={jobOffer.status}
          applications={jobOffer.applications}
          onHire={onHire}
          onReject={onReject}
        />
      ) : (
        <p className="italic text-gray-600">There are no applications yet</p>
      )}
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
      <JobCard jobOffer={jobOffer} hideCreator header={cardHeader} footer={cardFooter} />
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
