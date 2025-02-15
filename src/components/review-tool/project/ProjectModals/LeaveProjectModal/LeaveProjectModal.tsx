import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';

import { useNotifications } from '../../../../../hooks/useNotifications';
import { useDeleteProjectIdMember } from '../../../../../services/review-tool/hooks';
import { ProjectDto } from '../../../../../services/review-tool/types';
import { getErrorMessage } from '../../../../../utils/review-tool/getErrorMessage';

interface Props {
  project: ProjectDto | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export const LeaveProjectModal = ({ project, isOpen, onClose }: Props) => {
  const { mutate, isPending } = useDeleteProjectIdMember();
  const { pushNotification } = useNotifications();
  const router = useRouter();

  const handleLeave = () => {
    if (!project) {
      return;
    }

    mutate(
      { id: project.id },
      {
        onSuccess: () => {
          router.push('/');
          pushNotification({ icon: 'success', color: 'success', message: 'You were removed from the project' });
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
        <ModalHeader>Leave project</ModalHeader>
        <ModalBody className="pb-6">
          <div className="flex flex-col gap-4">
            <div className="text-medium">
              Are you sure you want to leave <span className="font-semibold">&quot;{project?.name}&quot;</span> project?
              You will no longer have access to this project.
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="light" isDisabled={isPending} onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" variant="flat" isLoading={isPending} onClick={handleLeave}>
                Leave
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
