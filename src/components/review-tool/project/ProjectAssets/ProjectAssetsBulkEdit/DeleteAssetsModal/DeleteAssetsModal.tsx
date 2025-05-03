import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useDeleteProjectIdAssets } from '../../../../../../services/review-tool/hooks';
import { getProjectId, getProjectIdAssetsArchived } from '../../../../../../services/review-tool/services';
import { getErrorMessage } from '../../../../../../utils/review-tool/getErrorMessage';

interface Props {
  projectId: string;
  assetIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DeleteAssetsModal = ({ projectId, assetIds, isOpen, onClose, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteProjectIdAssets();

  const handleDelete = () => {
    if (assetIds.length === 0) {
      return;
    }

    mutate(
      { id: projectId, requestBody: { assetIds } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdAssetsArchived.key, projectId] });
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, projectId] });
          addToast({ title: 'Assets were removed', color: 'success', variant: 'flat' });
          onClose();
          onSuccess();
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Delete assets</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to delete {assetIds.length} asset{assetIds.length === 1 ? '' : 's'}? This action can
              not be undone.
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="light" isDisabled={isPending} onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" variant="flat" isLoading={isPending} onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
