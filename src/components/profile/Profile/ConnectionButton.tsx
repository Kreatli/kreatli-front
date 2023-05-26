import { Button, Row } from '@nextui-org/react';
import React from 'react';

import { useModalVisibility } from '../../../hooks/useModalVisibility';
import { Icon } from '../../various/Icon';
import { InvitationModal } from '../InitationModal/InvitationModal';

interface Props {
  inviteeId: string;
  inviteeName: string;
  hasConnection: boolean;
  hasInvitation: boolean;
  wasInvited?: boolean;
}

export const ConnectionButton = ({ inviteeId, inviteeName, hasConnection, hasInvitation, wasInvited }: Props) => {
  const { isModalVisible, openModal, closeModal } = useModalVisibility();

  if (hasConnection) {
    return (
      <Button href="/" rounded auto icon={<Icon icon="chat" />}>
        Message
      </Button>
    );
  }

  if (wasInvited) {
    return (
      <Row css={{ gap: '$4' }}>
        <Button rounded flat auto icon={<Icon icon="check" />}>
          Accept invitation
        </Button>
        <Button rounded flat auto icon={<Icon icon="cross" />} color="error" />
      </Row>
    );
  }

  return (
    <>
      <Button
        rounded
        auto
        color="gradient"
        icon={hasInvitation && <Icon icon="mail" />}
        disabled={hasInvitation}
        onClick={openModal}
      >
        {hasInvitation ? 'Invitation sent' : 'Connect'}
      </Button>
      <InvitationModal
        inviteeId={inviteeId}
        inviteeName={inviteeName}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
    </>
  );
};
