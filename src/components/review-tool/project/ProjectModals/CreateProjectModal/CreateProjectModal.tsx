import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import React from 'react';

import { CreateProjectForm } from './CreateProjectForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent>
        <ModalHeader>Create a new project</ModalHeader>
        <ModalBody className="pb-6">
          <CreateProjectForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
