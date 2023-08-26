import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';
import { Common } from '../../../typings/common';
import { JobReviewForm } from './JobReviewForm';
import { useSession } from '../../../hooks/useSession';

interface Props {
  jobOfferId: Common.Id;
  isOpen: boolean;
  onClose: () => void;
}

export const JobReviewModal = ({ jobOfferId, isOpen, onClose }: Props) => {
  const { currentUser } = useSession();

  const modalDescription = `Share your feedback and rate the collaboration with ${currentUser?.role === 'creator' ? 'professional' : 'creator'}. Remember, once both sides have submitted their feedback, it will be displayed publicly`;

  return (
    <Modal backdrop="blur" placement="center" closeButton size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Rate your experience</ModalHeader>
        <ModalBody className="gap-4">
          <p>{modalDescription}</p>
          <JobReviewForm jobOfferId={jobOfferId} onCancel={onClose} onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
