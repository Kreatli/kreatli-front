import { Button, useDisclosure } from '@nextui-org/react';
import React from 'react';
import NextLink from 'next/link';

import { useSession } from '../../../hooks/useSession';
import { useUserInvitation } from '../../../hooks/useUserInvitation';
import { Common } from '../../../typings/common';
import { Icon } from '../../various/Icon';
import { InvitationModal } from '../InvitationModal/InvitationModal';
import { ProfileUnverifiedTooltip } from '../Profile/ProfileUnverifiedTooltip';

interface Props {
  userId: Common.Id;
  inviteeName: string;
  hasConnection: boolean;
  hasInvitation: boolean;
  mode?: 'redirect';
}

export const ConnectionButton = ({ userId, inviteeName, hasConnection, hasInvitation, mode }: Props) => {
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
        <Button disabled color="secondary">Connect</Button>
      </ProfileUnverifiedTooltip>
    );
  }

  if (hasConnection) {
    return (
      <Button href="/" variant="flat" color="secondary" startContent={<Icon icon="chat" size={18} />}>
        Message
      </Button>
    );
  }

  if (mode === 'redirect') {
    return (
      <Button
        as={NextLink}
        href={`/profile/${userId}`}
        color="secondary"
        startContent={hasInvitation && <Icon icon="mail" size={20} />}
        isDisabled={hasInvitation}
      >
        {hasInvitation ? 'Invitation sent' : 'Connect'}
      </Button>
    );
  }

  if (wasInvited) {
    return (
      <div className="flex gap-2">
        <Button color="secondary" startContent={<Icon icon="check" />} isLoading={isLoading} onClick={handleAccept}>
          Accept invitation
        </Button>
        <Button aria-label="Reject invitation" variant="flat" color="secondary" isIconOnly isLoading={isLoading} onClick={handleReject}>
          <Icon icon="cross" />
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        color="secondary"
        startContent={hasInvitation && <Icon icon="mail" size={20} />}
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
