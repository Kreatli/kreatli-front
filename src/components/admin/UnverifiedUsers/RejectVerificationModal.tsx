import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useNotifications } from '../../../hooks/useNotifications';
import { rejectUserVerification } from '../../../services/admin';
import { Common } from '../../../typings/common';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  isOpen: boolean;
  userId?: Common.Id | null;
  onClose: () => void;
}

export const RejectVerificationModal = ({ isOpen, userId, onClose }: Props) => {
  const [reason, setReason] = React.useState('');
  const { pushNotification } = useNotifications();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: rejectUserVerification,
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
    if (userId && reason.trim() !== '') {
      mutate([userId, { message: reason }]);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Are you sure you want to reject user&apos;s verification?</ModalHeader>
        <ModalBody>
          <Textarea
            value={reason}
            label="Reason"
            placeholder="Please provide a reason for rejecting user's verification"
            onChange={(event) => setReason(event.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" color="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="flat" color="secondary" onClick={handleClick} isLoading={isPending}>Send email</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
