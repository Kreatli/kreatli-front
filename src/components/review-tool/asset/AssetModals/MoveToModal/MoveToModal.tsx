import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { ProjectFileDto, ProjectFolderDto } from '../../../../../services/review-tool/types';
import { MoveToForm } from './MoveToForm';

interface Props {
  asset?: ProjectFolderDto | ProjectFileDto;
  isOpen: boolean;
  onClose: () => void;
}

export const MoveToModal = ({ asset, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Move &quot;{asset?.name}&quot;</ModalHeader>
        <ModalBody className="pb-6">{asset && <MoveToForm asset={asset} onSuccess={onClose} />}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
