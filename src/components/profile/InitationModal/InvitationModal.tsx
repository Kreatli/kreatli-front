import { Modal, Text } from '@nextui-org/react';
import React from 'react';

import { Common } from '../../../typings/common';
import { InvitationForm } from './InvitationForm';

interface Props {
  userId: Common.Id;
  inviteeName: string;
  isVisible: boolean;
  onClose: () => void;
}

export const InvitationModal: React.FC<Props> = ({ userId, inviteeName, isVisible, onClose }) => {
  return (
    <Modal
      closeButton
      blur
      width="500px"
      aria-labelledby="modal-title"
      open={isVisible}
      onClose={onClose}
    >
      <Modal.Header>
        <Text h3>
          Invite {inviteeName} to connect
        </Text>
      </Modal.Header>
      <Modal.Body>
        <InvitationForm userId={userId} onSuccess={onClose} onCancel={onClose} />
      </Modal.Body>
    </Modal>
  );
};
