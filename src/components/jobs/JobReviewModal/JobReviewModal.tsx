import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { Common } from '../../../typings/common';
import { Job } from '../../../typings/job';
import { JobReviewForm } from './JobReviewForm';

interface Props {
  jobOfferId: Common.Id;
  jobOfferStatus: Job.Offer['status'];
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const JobReviewModal = ({ jobOfferId, jobOfferStatus, isOpen, onClose, onSuccess }: Props) => {
  const { currentUser } = useSession();

  // prettier-ignore
  const modalDescription = `Share your feedback and rate the collaboration with ${currentUser?.role === 'creator' ? 'professional' : 'creator'}. Remember, once both sides have submitted their feedback, it will be displayed publicly`;

  const handleSuccess = () => {
    onClose();
    onSuccess?.();
  };

  return (
    <Modal backdrop="blur" scrollBehavior="inside" placement="center" size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Rate your experience</ModalHeader>
        <ModalBody className="gap-4">
          <p>{modalDescription}</p>
          <JobReviewForm
            jobOfferId={jobOfferId}
            jobOfferStatus={jobOfferStatus}
            onCancel={onClose}
            onSuccess={handleSuccess}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
