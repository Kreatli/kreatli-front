import { Button, Tooltip, useDisclosure } from '@nextui-org/react';
import { useBreakpointValue } from 'hooks/useBreakpointValue';
import NextLink from 'next/link';
import React from 'react';

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
  const isMobile = useBreakpointValue({ SM: false }, true);

  const invitation = currentUser?.invitations.find(({ inviter }) => inviter === userId);
  const isExceededLimits = currentUser?.exceededLimits.invitations;
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
      <Button as={NextLink} href={`/chat/${userId}`} variant="flat" color="secondary" isIconOnly={isMobile} startContent={<Icon icon="chat" size={18} />}>
        {!isMobile && 'Message'}
      </Button>
    );
  }

  if (mode === 'redirect') {
    return (
      <Button
        as={NextLink}
        href={`/profile/${userId}`}
        isIconOnly={isMobile}
        color="secondary"
        startContent={hasInvitation ? <Icon icon="mail" size={20} /> : <Icon icon="userPlus" size={20} />}
        isDisabled={hasInvitation}
      >
        {!isMobile && (
          hasInvitation ? 'Invitation sent' : 'Connect'
        )}
      </Button>
    );
  }

  if (wasInvited) {
    return (
      <div className="flex gap-2">
        <Button color="secondary" isIconOnly={isMobile} startContent={<Icon icon="check" />} isLoading={isLoading} onClick={handleAccept}>
          {!isMobile && 'Accept invitation'}
        </Button>
        <Button aria-label="Reject invitation" variant="flat" color="secondary" isIconOnly isLoading={isLoading} onClick={handleReject}>
          <Icon icon="cross" />
        </Button>
      </div>
    );
  }

  if (hasInvitation) {
    return (
      <Button
        color="secondary"
        isIconOnly={isMobile}
        startContent={<Icon icon="mail" size={20} />}
        isDisabled
        onClick={onOpen}
      >
        {!isMobile && 'Invitation sent'}
      </Button>
    );
  }

  return (
    <>
      <Tooltip isDisabled={!isExceededLimits} content="You've reached your connection requests limit. Get to the next tier to increase the limit">
        <div>
          <Button
            color="secondary"
            isIconOnly={isMobile}
            startContent={<Icon icon="userPlus" size={20} />}
            isDisabled={isExceededLimits}
            onClick={onOpen}
          >
            {!isMobile && 'Connect'}
          </Button>
        </div>
      </Tooltip>
      <InvitationModal
        userId={userId}
        inviteeName={inviteeName}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
