import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useNotifications } from '../../../../../hooks/useNotifications';
import { useDeleteProjectId } from '../../../../../services/review-tool/hooks';
import { getProjects } from '../../../../../services/review-tool/services';
import { ProjectDto } from '../../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';

interface Props {
  project?: ProjectDto;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteProjectModal = ({ project, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useDeleteProjectId();
  const { pushNotification } = useNotifications();

  const handleDelete = () => {
    if (!project) {
      return;
    }

    mutate(
      { id: project.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          pushNotification({ icon: 'success', color: 'success', message: 'The project was successfully deleted' });
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
        <ModalHeader>Delete project</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to delete <span className="font-semibold">&quot;{project?.name}&quot;</span>{' '}
              project? This action can not be undone.
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
