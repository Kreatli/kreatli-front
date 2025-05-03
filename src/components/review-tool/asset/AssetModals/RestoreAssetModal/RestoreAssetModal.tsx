import { addToast, Button, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { usePostProjectIdAssetsRestore } from '../../../../../services/review-tool/hooks';
import { getProjectId, getProjectIdAssetsArchived } from '../../../../../services/review-tool/services';
import { ProjectFileDto, ProjectFolderDto } from '../../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';

interface Props {
  projectId: string;
  asset?: ProjectFolderDto | ProjectFileDto;
  isOpen: boolean;
  onClose: () => void;
}

export const RestoreAssetModal = ({ asset, projectId, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePostProjectIdAssetsRestore();

  const handleRestore = () => {
    if (!asset) {
      return;
    }

    mutate(
      { id: projectId, requestBody: { assetIds: [asset.id] } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdAssetsArchived.key, projectId] });
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, projectId] });
          addToast({ title: 'This asset was restored', color: 'success', variant: 'flat' });
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
        <ModalHeader>Restore Asset</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to restore <span className="font-semibold">&quot;{asset?.name}&quot;</span>?
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="light" isDisabled={isPending} onClick={onClose}>
                Cancel
              </Button>
              <Button className="bg-foreground text-content1" isLoading={isPending} onClick={handleRestore}>
                Restore
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
