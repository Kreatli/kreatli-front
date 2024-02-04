import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { useNotifications } from '../../../hooks/useNotifications';
import { acceptUserVerification } from '../../../services/admin';
import { Common } from '../../../typings/common';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  isOpen: boolean;
  userId?: Common.Id | null;
  onClose: () => void;
}

export const AcceptVerificationModal = ({ isOpen, userId, onClose }: Props) => {
  const { pushNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(acceptUserVerification, {
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries('unverifiedUsers');
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
          <Button variant="light" color="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="flat" color="secondary" onClick={handleClick} isLoading={isLoading}>Mark as verified</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
