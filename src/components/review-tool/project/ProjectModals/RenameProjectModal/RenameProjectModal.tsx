import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import React from 'react';

import { ProjectDto } from '../../../../../services/review-tool/types';
import { RenameProjectForm } from './RenameProjectForm';

interface Props {
  project?: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
}

export const RenameProjectModal = ({ project, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Rename project</ModalHeader>
        <ModalBody className="pb-6">{project && <RenameProjectForm project={project} onSuccess={onClose} />}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
