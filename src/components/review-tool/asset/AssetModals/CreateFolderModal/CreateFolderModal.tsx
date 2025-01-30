import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { CreateFolderForm } from './CreateFolderForm';

interface Props {
  projectId: string;
  folderId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateFolderModal = ({ projectId, folderId, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Create folder</ModalHeader>
        <ModalBody className="pb-6">
          <CreateFolderForm projectId={projectId} parentId={folderId} onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
