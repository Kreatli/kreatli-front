import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

import { useNotifications } from '../../../../hooks/useNotifications';
import { rejectUserVerification, rejectUserVerifications } from '../../../../services/marketplace/admin';
import { Common } from '../../../../typings/common';
import { getErrorMessage } from '../../../../utils/marketplace/getErrorMessage';

interface Props {
  isOpen: boolean;
  userId?: Common.Id | null;
  userIds?: Common.Id[];
  onClose: () => void;
  onSuccess?: () => void;
}

export const RejectVerificationModal = ({ isOpen, userId, userIds, onClose, onSuccess }: Props) => {
  const [reason, setReason] = React.useState('');
  const { pushNotification } = useNotifications();
  const queryClient = useQueryClient();

  const hasMultipleUsers = (userIds?.length ?? 0) > 1;

  const handleSuccess = ({ message }: { message: string }) => {
    pushNotification({ message, color: 'success', icon: 'success' });
    onClose();
    onSuccess?.();
    queryClient.invalidateQueries({ queryKey: ['unverifiedUsers'] });
  };

  const handleError = (error: Error) => {
    pushNotification({
      message: getErrorMessage(error),
      color: 'danger',
      icon: 'error',
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: rejectUserVerification,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { mutate: bulkMutate, isPending: isBulkPending } = useMutation({
    mutationFn: rejectUserVerifications,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const isLoading = isPending || isBulkPending;

  const handleSubmit = () => {
    if (reason.trim() === '') {
      pushNotification({
        message: 'Please provide a reason for rejecting user verification',
        color: 'warning',
        icon: 'warning',
      });

      return;
    }

    if (userId) {
      mutate([userId, { message: reason }]);

      return;
    }

    if (userIds?.length === 1) {
      mutate([userIds[0], { message: reason }]);

      return;
    }

    if (userIds) {
      bulkMutate({ ids: userIds, message: reason });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          {hasMultipleUsers
            ? `Are you sure you want to reject ${userIds?.length} users?`
            : "Are you sure you want to reject user's verification?"}
        </ModalHeader>
        <ModalBody>
          <Textarea
            value={reason}
            label="Reason"
            isRequired
            placeholder="Please provide a reason for rejecting user's verification"
            onChange={(event) => setReason(event.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="light" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="flat" color="secondary" onClick={handleSubmit} isLoading={isLoading}>
            {hasMultipleUsers ? 'Send email' : 'Send email'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
