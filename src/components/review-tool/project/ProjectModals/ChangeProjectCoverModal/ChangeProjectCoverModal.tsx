import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { ProjectDto } from '../../../../../services/review-tool/types';
import { ChangeProjectCoverForm } from './ChangeProjectCoverForm';

interface Props {
  project?: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeProjectCoverModal = ({ project, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalContent>
        <ModalHeader>Change cover image</ModalHeader>
        <ModalBody className="pb-6">
          {project && <ChangeProjectCoverForm project={project} onSuccess={onClose} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
