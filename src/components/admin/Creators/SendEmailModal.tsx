import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, Textarea } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { useNotifications } from '../../../hooks/useNotifications';
import { sendEmail } from '../../../services/admin';
import { Common } from '../../../typings/common';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  userId: Common.Nullable<Common.Id>;
  isOpen: boolean;
  onClose: () => void;
}

export const SendEmailModal = ({ userId, isOpen, onClose }: Props) => {
  const [subject, setSubject] = React.useState('Kreatli Marketplace - ');
  const [message, setMessage] = React.useState('');

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

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId || !subject || !message) {
      return;
    }

    mutate([userId, { subject, message }]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Send email to creator</ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-6" noValidate onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
              <Input
                label="Subject"
                value={subject}
                isRequired
                isDisabled={isPending}
                onChange={(event) => setSubject(event.target.value)}
              />
              <Textarea
                label="Message"
                value={message}
                isRequired
                placeholder="Remember that 'Hi {name}' is already included in the message."
                isDisabled={isPending}
                onChange={(event) => setMessage(event.target.value)}
              />
            </div>
            <div className="flex gap-4 justify-end mb-2">
              <Button variant="light" color="secondary" isDisabled={isPending} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="flat" color="secondary" isLoading={isPending}>
                Send email
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
