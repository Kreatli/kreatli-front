import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';
import { Common } from '../../../typings/common';
import { JobReviewForm } from './JobReviewForm';
import { useSession } from '../../../hooks/useSession';
import { Job } from '../../../typings/job';

interface Props {
  jobOfferId: Common.Id;
  jobOfferStatus: Job.Offer['status'];
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const JobReviewModal = ({ jobOfferId, jobOfferStatus, isOpen, onClose, onSuccess }: Props) => {
  const { currentUser } = useSession();

  const modalDescription = `Share your feedback and rate the collaboration with ${currentUser?.role === 'creator' ? 'professional' : 'creator'}. Remember, once both sides have submitted their feedback, it will be displayed publicly`;

  const handleSuccess = () => {
    onClose();
    onSuccess?.();
  };

  return (
    <Modal backdrop="blur" placement="center" closeButton size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Rate your experience</ModalHeader>
        <ModalBody className="gap-4">
          <p>{modalDescription}</p>
          <JobReviewForm jobOfferId={jobOfferId} jobOfferStatus={jobOfferStatus} onCancel={onClose} onSuccess={handleSuccess} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
