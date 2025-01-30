import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useNotifications } from '../../../../../../hooks/useNotifications';
import { usePostProjectIdAssetsRestore } from '../../../../../../services/review-tool/hooks';
import { getProjectId, getProjectIdAssetsArchived } from '../../../../../../services/review-tool/services';
import { getErrorMessage } from '../../../../../../utils/review-tool/getErrorMessage';

interface Props {
  projectId: string;
  assetIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RestoreAssetsModal = ({ projectId, assetIds, isOpen, onClose, onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const { pushNotification } = useNotifications();
  const { mutate, isPending } = usePostProjectIdAssetsRestore();

  const handleRestore = () => {
    if (assetIds.length === 0) {
      return;
    }

    mutate(
      { id: projectId, requestBody: { assetIds } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjectIdAssetsArchived.key, projectId] });
          queryClient.invalidateQueries({ queryKey: [getProjectId.key, projectId] });
          pushNotification({ icon: 'success', color: 'success', message: 'Assets were restored' });
          onClose();
          onSuccess();
        },
        onError: (error) => {
          pushNotification({ icon: 'error', message: getErrorMessage(error) });
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Restore assets</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to restore {assetIds.length} asset{assetIds.length === 1 ? '' : 's'}?
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
