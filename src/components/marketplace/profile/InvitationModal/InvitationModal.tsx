import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { Common } from '../../../../typings/common';
import { InvitationForm } from './InvitationForm';

interface Props {
  userId: Common.Id;
  inviteeName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const InvitationModal = ({ userId, inviteeName, isOpen, onClose }: Props) => {
  return (
    <Modal placement="center" size="md" backdrop="blur" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Invite {inviteeName} to connect</ModalHeader>
        <ModalBody>
          <InvitationForm userId={userId} onSuccess={onClose} onCancel={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
