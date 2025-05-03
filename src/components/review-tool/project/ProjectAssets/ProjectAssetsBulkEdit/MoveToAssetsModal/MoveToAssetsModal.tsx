import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import React from 'react';

import { ProjectDto } from '../../../../../../services/review-tool/types';
import { MoveToAssetsForm } from './MoveToAssetsForm';

interface Props {
  project: ProjectDto;
  assetIds: string[];
  currentParentId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const MoveToAssetsModal = ({ project, assetIds, currentParentId, isOpen, onClose, onSuccess }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isDismissable={false}>
      <ModalContent>
        <ModalHeader>
          Move {assetIds.length} asset{assetIds.length === 1 ? '' : 's'}
        </ModalHeader>
        <ModalBody className="pb-6">
          {assetIds.length > 0 && (
            <MoveToAssetsForm
              project={project}
              assetIds={assetIds}
              currentParentId={currentParentId}
              onCancel={onClose}
              onSuccess={() => {
                onClose();
                onSuccess();
              }}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
