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

  const modalDescription = currentUser?.role === 'creator'
    ? 'Help us enhance our platform by sharing your feedback. Kindly rate and review the professional you collaborated with.'
    : 'Help us enhance our platform by sharing your feedback. Kindly rate and review the creator you collaborated with.';

  return (
    <Modal backdrop="blur" placement="center" closeButton size="md" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Rate your experience</ModalHeader>
        <ModalBody>
          <p className="text-center">{modalDescription}</p>
          <JobReviewForm jobOfferId={jobOfferId} onCancel={onClose} onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
