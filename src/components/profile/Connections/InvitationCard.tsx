import { Button, Card, CardBody, CardHeader, User } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { useUserInvitation } from '../../../hooks/useUserInvitation';
import { Invitation } from '../../../typings/invitation';
import { getUserShortDescription } from '../../../utils/user';
import { Icon } from '../../various/Icon';
import { ProfileUnverifiedTooltip } from '../Profile/ProfileUnverifiedTooltip';

interface Props {
  invitation: Invitation;
}

export const InvitationCard = ({ invitation }: Props) => {
  const { inviter, message } = invitation;
  const { currentUser } = useSession();
  const { isLoading, handleAccept, handleReject } = useUserInvitation({
    invitationId: invitation._id,
    userId: inviter._id,
  });

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <NextLink href={`/profile/${inviter._id}`}>
          <User
            avatarProps={{ src: inviter.avatarUrl }}
            description={getUserShortDescription(inviter)}
            name={inviter.name}
          />
        </NextLink>
        <div className="flex gap-2">
          <ProfileUnverifiedTooltip>
            <Button aria-label="Accept invitation" isIconOnly radius="full" disabled={!currentUser?.isVerified} isDisabled={isLoading} color="secondary" onClick={handleAccept}>
              <Icon icon="check" />
            </Button>
          </ProfileUnverifiedTooltip>
          <ProfileUnverifiedTooltip>
            <Button aria-label="Reject invitation" isIconOnly radius="full" variant="flat" disabled={!currentUser?.isVerified} isDisabled={isLoading} color="secondary" onClick={handleReject}>
              <Icon icon="cross" />
            </Button>
          </ProfileUnverifiedTooltip>
        </div>
      </CardHeader>
      {true && (
        <CardBody className="pt-0">
          <p className="text-sm">Hello! My name is Yury. Let's chat</p>
        </CardBody>
      )}
    </Card>
  );
};
