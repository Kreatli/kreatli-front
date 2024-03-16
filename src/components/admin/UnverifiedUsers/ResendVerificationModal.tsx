import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { useNotifications } from '../../../hooks/useNotifications';
import { resendActivationLink } from '../../../services/admin';
import { Common } from '../../../typings/common';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  isOpen: boolean;
  userId?: Common.Id | null;
  onClose: () => void;
}

export const ResendVerificationModal = ({ isOpen, userId, onClose }: Props) => {
  const { pushNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(resendActivationLink, {
    onSuccess: ({ message }) => {
      pushNotification({ message, color: 'success', icon: 'success' });
      onClose();
      queryClient.invalidateQueries({ queryKey: ['unverifiedUsers'] });
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
        <ModalHeader>Are you sure you want to resend verification email?</ModalHeader>
        <ModalBody>
          <p className="text-small text-foreground-500">
            The user will get standard post-registration email with a link to activate their profile.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" color="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="flat" color="secondary" onClick={handleClick} isLoading={isLoading}>Resend email</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
