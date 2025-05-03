import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import React from 'react';

import { ProjectDto, ProjectFileDto, ProjectFolderDto } from '../../../../../services/review-tool/types';
import { MoveToForm } from './MoveToForm';

interface Props {
  asset?: ProjectFolderDto | ProjectFileDto;
  project: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
}

export const MoveToModal = ({ asset, project, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isDismissable={false}>
      <ModalContent>
        <ModalHeader>Move &quot;{asset?.name}&quot;</ModalHeader>
        <ModalBody className="pb-6">
          {asset && <MoveToForm asset={asset} project={project} onCancel={onClose} onSuccess={onClose} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
