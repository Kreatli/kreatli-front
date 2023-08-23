import { Button, useDisclosure } from '@nextui-org/react';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { useUserInvitation } from '../../../hooks/useUserInvitation';
import { Common } from '../../../typings/common';
import { Icon } from '../../various/Icon';
import { InvitationModal } from '../InvitationModal/InvitationModal';
import { ProfileUnverifiedTooltip } from './ProfileUnverifiedTooltip';

interface Props {
  userId: Common.Id;
  inviteeName: string;
  hasConnection: boolean;
  hasInvitation: boolean;
}

export const ProfileHeaderButton = ({ userId, inviteeName, hasConnection, hasInvitation }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <Button disabled color="secondary" radius="full">Connect</Button>
      </ProfileUnverifiedTooltip>
    );
  }

  if (hasConnection) {
    return (
      <Button href="/" radius="full" variant="flat" color="secondary" startContent={<Icon icon="chat" size={18} />}>
        Message
      </Button>
    );
  }

  if (wasInvited) {
    return (
      <div className="flex gap-2">
        <Button radius="full" color="secondary" startContent={<Icon icon="check" />} isLoading={isLoading} onClick={handleAccept}>
          Accept invitation
        </Button>
        <Button aria-label="Reject invitation" radius="full" variant="flat" color="secondary" isIconOnly isLoading={isLoading} onClick={handleReject}>
          <Icon icon="cross" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        radius="full"
        color="secondary"
        startContent={hasInvitation && <Icon icon="mail" />}
        isDisabled={hasInvitation}
        onClick={onOpen}
      >
        {hasInvitation ? 'Invitation sent' : 'Connect'}
      </Button>
      <InvitationModal
        userId={userId}
        inviteeName={inviteeName}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
