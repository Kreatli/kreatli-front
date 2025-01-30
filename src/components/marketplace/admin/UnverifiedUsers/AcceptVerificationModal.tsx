import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useNotifications } from '../../../../hooks/useNotifications';
import { acceptUserVerification } from '../../../../services/marketplace/admin';
import { Common } from '../../../../typings/common';
import { getErrorMessage } from '../../../../utils/marketplace/getErrorMessage';

interface Props {
  isOpen: boolean;
  userId?: Common.Id | null;
  onClose: () => void;
}

export const AcceptVerificationModal = ({ isOpen, userId, onClose }: Props) => {
  const { pushNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: acceptUserVerification,
    onSuccess: () => {
      pushNotification({ message: 'The user was marked as verified!', color: 'success', icon: 'success' });
      onClose();
      queryClient.invalidateQueries({ queryKey: ['unverifiedUsers'] });
      queryClient.invalidateQueries({ queryKey: ['rejectedUsers'] });
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const handleClick = () => {
    if (userId) {
      mutate(userId);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Are you sure you want to mark this user as verified?</ModalHeader>
        <ModalBody>
          <p className="text-small text-foreground-500">
            Once you mark this user as verified, they will get standard email about their profile activation.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="flat" color="secondary" onClick={handleClick} isLoading={isPending}>
            Mark as verified
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
