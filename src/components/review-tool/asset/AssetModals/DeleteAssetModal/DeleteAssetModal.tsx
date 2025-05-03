import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useDeleteProjectIdAssets } from '../../../../../services/review-tool/hooks';
import { getProjectIdAssetsArchived } from '../../../../../services/review-tool/services';
import { ProjectFileDto, ProjectFolderDto } from '../../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';

interface Props {
  asset?: ProjectFolderDto | ProjectFileDto;
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteAssetModal = ({ asset, projectId, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteProjectIdAssets();

  const handleDelete = () => {
    if (!asset) {
      return;
    }

    mutate(
      { id: projectId, requestBody: { assetIds: [asset.id] } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdAssetsArchived.key, projectId] });
          addToast({ title: 'This asset was removed', color: 'success', variant: 'flat' });
          onClose();
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
        <ModalHeader>{asset?.type === 'folder' ? 'Delete folder' : 'Delete file'}</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to delete <span className="font-semibold">&quot;{asset?.name}&quot;</span>? This
              action can not be undone.
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
