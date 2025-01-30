import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useNotifications } from '../../../../../hooks/useNotifications';
import { usePostProjectIdAssetsArchive } from '../../../../../services/review-tool/hooks';
import { getAssetFolderId, getProjectId } from '../../../../../services/review-tool/services';
import { ProjectFileDto, ProjectFolderDto } from '../../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';

interface Props {
  projectId: string;
  asset?: ProjectFolderDto | ProjectFileDto;
  isOpen: boolean;
  onClose: () => void;
}

export const ArchiveAssetModal = ({ projectId, asset, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePostProjectIdAssetsArchive();
  const { pushNotification } = useNotifications();

  const handleArchive = () => {
    if (!asset) {
      return;
    }

    mutate(
      { id: projectId, requestBody: { assetIds: [asset.id] } },
      {
        onSuccess: ({ project, parent }) => {
          if (parent) {
            queryClient.setQueryData([getAssetFolderId.key, parent.id], parent);
          }

          queryClient.setQueryData([getProjectId.key, projectId], project);
          pushNotification({ icon: 'success', color: 'success', message: 'This asset was moved to Archived' });
          onClose();
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
        <ModalHeader>{asset?.type === 'folder' ? 'Archive folder' : 'Archive file'}</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to archive <span className="font-semibold">&quot;{asset?.name}&quot;</span>?
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="light" isDisabled={isPending} onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" variant="flat" isLoading={isPending} onClick={handleArchive}>
                Archive
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
