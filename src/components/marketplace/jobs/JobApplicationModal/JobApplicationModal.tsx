import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { Common } from '../../../../typings/common';
import { JobApplicationForm } from './JobApplicationForm';

interface Props {
  jobOfferId: Common.Id;
  title: string;
  shortDescription: string;
  isOpen: boolean;
  onClose: () => void;
}

export const JobApplicationModal = ({ jobOfferId, title, shortDescription, isOpen, onClose }: Props) => {
  return (
    <Modal placement="center" backdrop="blur" size="md" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <p>{shortDescription}</p>
          <JobApplicationForm jobOfferId={jobOfferId} onSuccess={onClose} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
