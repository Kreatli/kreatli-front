import { Button, Row } from '@nextui-org/react';
import React from 'react';

import { useModalVisibility } from '../../../hooks/useModalVisibility';
import { useSession } from '../../../hooks/useSession';
import { useUserInvitation } from '../../../hooks/useUserInvitation';
import { Common } from '../../../typings/common';
import { Icon } from '../../various/Icon';
import { InvitationModal } from '../InitationModal/InvitationModal';
import { ProfileUnverifiedTooltip } from './ProfileUnverifiedTooltip';

interface Props {
  userId: Common.Id;
  inviteeName: string;
  hasConnection: boolean;
  hasInvitation: boolean;
}

export const ProfileHeaderButton = ({ userId, inviteeName, hasConnection, hasInvitation }: Props) => {
  const { isModalVisible, openModal, closeModal } = useModalVisibility();
  const { currentUser } = useSession();

  const invitation = currentUser?.invitations.find(({ inviter }) => inviter === userId);
  const wasInvited = !!invitation;
  const { isLoading, handleAccept, handleReject } = useUserInvitation({
    invitationId: invitation?._id,
    userId,
  });

  if (!currentUser?.isVerified) {
    return (
      <ProfileUnverifiedTooltip>
        <Button disabled rounded auto>Connect</Button>
      </ProfileUnverifiedTooltip>
    );
  }

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
        <Button rounded flat auto icon={<Icon icon="check" />} disabled={isLoading} onClick={handleAccept}>
          Accept invitation
        </Button>
        <Button rounded flat auto icon={<Icon icon="cross" />} disabled={isLoading} color="error" onClick={handleReject} />
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
        userId={userId}
        inviteeName={inviteeName}
        isVisible={isModalVisible}
        onClose={closeModal}
      />
    </>
  );
};
