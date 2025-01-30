import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useNotifications } from '../../../../../hooks/useNotifications';
import { usePutProjectIdStatus } from '../../../../../services/review-tool/hooks';
import { getProjectId, getProjects } from '../../../../../services/review-tool/services';
import { ProjectDto } from '../../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';

interface Props {
  project?: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
}

export const RestoreProjectModal = ({ project, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePutProjectIdStatus();
  const { pushNotification } = useNotifications();

  const handleRestore = () => {
    if (!project) {
      return;
    }

    mutate(
      { id: project?.id, requestBody: { status: 'active' } },
      {
        onSuccess: (updatedProject) => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.setQueryData([getProjectId.key, project.id], updatedProject);
          pushNotification({ icon: 'success', color: 'success', message: 'The project was restored' });
          onClose();
        },
        onError: (error) => {
          pushNotification({ icon: 'error', message: getErrorMessage(error) });
        },
      },
    );
  };

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Restore project</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to restore <span className="font-semibold">&quot;{project?.name}&quot;</span>{' '}
              project?
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="light" isDisabled={isPending} onClick={onClose}>
                Cancel
              </Button>
              <Button color="success" variant="flat" isLoading={isPending} onClick={handleRestore}>
                Restore
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
