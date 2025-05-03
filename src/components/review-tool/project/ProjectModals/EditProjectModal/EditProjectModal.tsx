import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import React from 'react';

import { ProjectDto } from '../../../../../services/review-tool/types';
import { EditProjectForm } from './EditProjectForm';

interface Props {
  project?: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProjectModal = ({ project, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit project description</ModalHeader>
        <ModalBody className="pb-6">{project && <EditProjectForm project={project} onSuccess={onClose} />}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
