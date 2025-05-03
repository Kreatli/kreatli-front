import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import React from 'react';

import { ProjectDto } from '../../../../services/review-tool/types';

interface Props {
  isOpen: boolean;
  project: ProjectDto;
  onClose: () => void;
}

export const ProjectDescriptionModal = ({ isOpen, project, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Project description</ModalHeader>
        <ModalBody className="pt-0 pb-6">
          {project.description ? (
            <p className="text-foreground-500">{project.description}</p>
          ) : (
            <p className="text-foreground-500">No description.</p>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
