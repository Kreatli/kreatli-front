import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react';
import React from 'react';

import { JobApplications } from '../JobApplications';
import { JobCard } from '../JobCard';
import { JOB_OFFER_STATUS_COLORS, JOB_OFFER_STATUS_LABELS } from '../../../constants/job';
import { Job } from '../../../typings/job';
import { useMutation, useQueryClient } from 'react-query';
import { requestJobOfferCancel } from '../../../services/job';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useNotifications } from '../../../hooks/useNotifications';
import { Icon } from '../../various/Icon';
import { JobReviewModal } from '../JobReviewModal';
import { Rating } from '../../various/Rating';

interface Props {
  jobOffer: Job.Offer;
}

export const MyJobsOffer = ({ jobOffer }: Props) => {
  const isPosted = jobOffer.status === 'posted';
  const isOngoing = jobOffer.status === 'ongoing';
  const isCompleted = jobOffer.status === 'completed';
  const hasLeftReview = !!jobOffer.reviews.creator;
  const professionalReview = jobOffer.reviews.professional;
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pushNotification } = useNotifications();

  const updateJobOffer = (jobOffer: Job.Offer) => {
    const jobOffers = queryClient.getQueryData<Job.Offer[]>(['creator', 'job-offers']);
    const updatedJobOffers = jobOffers?.map((offer) => (offer._id === jobOffer._id ? jobOffer : offer));
    queryClient.setQueryData(['creator', 'job-offers'], updatedJobOffers);
  };

  const { mutate: mutateCancel, isLoading: isCanceling } = useMutation(requestJobOfferCancel, {
    onSuccess: (jobOffer) => {
      updateJobOffer(jobOffer);
      pushNotification({
        message: 'The job was cancelled',
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
      label: 'Cancel offer',
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
            <Button aria-label="Job offer options" variant="light" radius="full" size="sm" isIconOnly>
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
        ? <JobApplications jobOfferId={jobOffer._id} jobOfferStatus={jobOffer.status} applications={jobOffer.applications} />
        : <p className="italic text-gray-600">There are no applications yet</p>}
      {professionalReview && (
        <div>
          <p className="font-semibold">Review:</p>
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
      {shouldShowReviewModal && <JobReviewModal isOpen={isOpen} jobOfferId={jobOffer._id} onClose={onClose} />}
    </>
  );
};
