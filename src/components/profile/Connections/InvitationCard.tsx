import { Button, Card, Text, User } from '@nextui-org/react';
import Link from 'next/link';
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
    <Card variant="bordered">
      <Card.Header css={{ justifyContent: 'space-between' }}>
        <Link href={`/profile/${inviter._id}`} style={{ maxWidth: 'calc(100% - 5.5rem)' }}>
          <User
            src={inviter.avatarUrl}
            description={getUserShortDescription(inviter)}
            size="xl"
            pointer
            bordered
            name={inviter.name}
          />
        </Link>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <ProfileUnverifiedTooltip>
            <Button icon={<Icon icon="check" />} auto rounded flat disabled={isLoading || !currentUser?.isVerified} onClick={handleAccept} />
          </ProfileUnverifiedTooltip>
          <ProfileUnverifiedTooltip>
            <Button icon={<Icon icon="cross" />} auto rounded flat disabled={isLoading || !currentUser?.isVerified} color="error" onClick={handleReject} />
          </ProfileUnverifiedTooltip>
        </div>
      </Card.Header>
      {message && (
        <Card.Body css={{ p: '$0 $10 $6' }}>
          <Text size="$sm">{message}</Text>
        </Card.Body>
      )}
    </Card>
  );
};
