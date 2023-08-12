import { Modal, Text } from '@nextui-org/react';
import React from 'react';
import { Common } from '../../../typings/common';
import { JobReviewForm } from './JobReviewForm';
import { useSession } from '../../../hooks/useSession';

interface Props {
  jobOfferId: Common.Id;
  isVisible: boolean;
  onClose: () => void;
}

export const JobReviewModal = ({ jobOfferId, isVisible, onClose }: Props) => {
  const { currentUser } = useSession();

  const modalDescription = currentUser?.role === 'creator'
    ? 'Help us enhance our platform by sharing your feedback. Kindly rate and review the professional you collaborated with.'
    : 'Help us enhance our platform by sharing your feedback. Kindly rate and review the creator you collaborated with.';

  return (
    <Modal blur closeButton width="500px" open={isVisible} onClose={onClose}>
      <Modal.Header>
        <Text h3>Rate your experience</Text>
      </Modal.Header>
      <Modal.Body>
        <Text css={{ textAlign: 'center' }}>{modalDescription}</Text>
        <JobReviewForm jobOfferId={jobOfferId} onCancel={onClose} onSuccess={onClose} />
      </Modal.Body>
    </Modal>
  );
};
