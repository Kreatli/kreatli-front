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

export const CompleteProjectModal = ({ project, isOpen, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = usePutProjectIdStatus();
  const { pushNotification } = useNotifications();

  const handleComplete = () => {
    if (!project) {
      return;
    }

    mutate(
      { id: project.id, requestBody: { status: 'completed' } },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [getProjects.key] });
          queryClient.setQueryData([getProjectId.key, project.id], data);
          pushNotification({ icon: 'success', color: 'success', message: 'The project was marked as completed' });
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
        <ModalHeader>Complete project</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to mark <span className="font-semibold">&quot;{project?.name}&quot;</span> project
              as completed?
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="light" isDisabled={isPending} onClick={onClose}>
                Cancel
              </Button>
              <Button color="success" variant="flat" isLoading={isPending} onClick={handleComplete}>
                Complete
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
