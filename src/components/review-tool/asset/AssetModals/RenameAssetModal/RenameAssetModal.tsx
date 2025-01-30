import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { ProjectFileDto, ProjectFolderDto } from '../../../../../services/review-tool/types';
import { RenameAssetForm } from './RenameAssetForm';

interface Props {
  projectId: string;
  asset?: ProjectFolderDto | ProjectFileDto;
  isOpen: boolean;
  onClose: () => void;
}

export const RenameAssetModal = ({ projectId, asset, isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Rename {asset?.type}</ModalHeader>
        <ModalBody className="pb-6">
          {asset && <RenameAssetForm projectId={projectId} asset={asset} onSuccess={onClose} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
