import { Modal, Text } from '@nextui-org/react';
import React from 'react';

import { Common } from '../../../typings/common';
import { JobApplicationForm } from './JobApplicationForm';

interface Props {
  jobOfferId: Common.Id;
  title: string;
  shortDescription: string;
  isVisible: boolean;
  onClose: () => void;
}

export const JobApplicationModal = ({ jobOfferId, title, shortDescription, isVisible, onClose }: Props) => {
  return (
    <Modal
      closeButton
      blur
      width="500px"
      aria-labelledby="modal-title"
      open={isVisible}
      onClose={onClose}
    >
      <Modal.Header>
        <Text h3>{title}</Text>
      </Modal.Header>
      <Modal.Body>
        <Text size="$sm">{shortDescription}</Text>
        <JobApplicationForm jobOfferId={jobOfferId} onSuccess={onClose} onCancel={onClose} />
      </Modal.Body>
    </Modal>
  );
};
