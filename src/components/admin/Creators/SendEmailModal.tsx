import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { useNotifications } from '../../../hooks/useNotifications';
import { sendEmail } from '../../../services/admin';
import { Common } from '../../../typings/common';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { SendEmailForm } from './SendEmailForm';

interface Props {
  userId: Common.Nullable<Common.Id>;
  isOpen: boolean;
  onClose: () => void;
}

export const SendEmailModal = ({ userId, isOpen, onClose }: Props) => {
  const { pushNotification } = useNotifications();

  const { mutate, isPending } = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      pushNotification({ message: 'The email was sent!', color: 'success', icon: 'success' });
      onClose();
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const handleSubmit = (data: { message: string }) => {
    if (!userId) {
      return;
    }

    mutate([userId, data]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Send email to creator</ModalHeader>
        <ModalBody>
          <SendEmailForm isPending={isPending} onClose={onClose} onSubmit={handleSubmit} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
