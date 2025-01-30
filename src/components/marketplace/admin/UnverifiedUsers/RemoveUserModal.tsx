import { Button, Modal, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useNotifications } from '../../../../hooks/useNotifications';
import { removeUser, removeUsers } from '../../../../services/marketplace/admin';
import { Common } from '../../../../typings/common';
import { getErrorMessage } from '../../../../utils/marketplace/getErrorMessage';

interface Props {
  userId?: Common.Id | null;
  userIds?: Common.Id[];
  userName?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RemoveUserModal = ({ userId, userIds, userName, isOpen, onClose, onSuccess }: Props) => {
  const { pushNotification } = useNotifications();
  const queryClient = useQueryClient();

  const hasMultipleUsers = (userIds?.length ?? 0) > 1;

  const handleSuccess = () => {
    pushNotification({
      message: `User${hasMultipleUsers ? 's were' : ' was'} deleted`,
      color: 'success',
      icon: 'success',
    });
    onClose();
    onSuccess?.();
    queryClient.invalidateQueries({ queryKey: ['unverifiedUsers'] });
    queryClient.invalidateQueries({ queryKey: ['rejectedUsers'] });
  };

  const handleError = (error: Error) => {
    pushNotification({
      message: getErrorMessage(error),
      color: 'danger',
      icon: 'error',
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: removeUser,
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const { mutate: bulkMutate, isPending: isBulkPending } = useMutation({
    mutationFn: removeUsers,
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const isLoading = isPending || isBulkPending;

  const handleRemove = () => {
    if (userId) {
      mutate(userId);

      return;
    }

    if (userIds?.length === 1) {
      mutate(userIds[0]);

      return;
    }

    if (userIds) {
      bulkMutate({ ids: userIds });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          {hasMultipleUsers
            ? `Are you sure you want to delete ${userIds?.length} users?`
            : `Are you sure you want to delete ${userName}'s account?`}
        </ModalHeader>
        <ModalFooter>
          <Button variant="light" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="flat" color="secondary" onClick={handleRemove} isLoading={isLoading}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
