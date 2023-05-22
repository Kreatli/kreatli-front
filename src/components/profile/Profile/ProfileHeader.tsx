import { Avatar, Badge, Button, Grid, Text } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { User } from '../../../typings/user';
import { Icon } from '../../various/Icon';
import { ConnectionButton } from './ConnectionButton';

interface Props {
  user: User.Type;
}

export const ProfileHeader = ({ user }: Props) => {
  const { _id: userId, connectionsCount, role, name, avatarUrl, isVerified } = user;
  const { currentUserId } = useSession();

  const isMyAccount = currentUserId === userId;
  const youtubeUsername = role === 'creator'
    ? user.youtube.customUrl
    : undefined;

  const userInitials = React.useMemo(() => {
    return name.split(' ').map((part: string) => part[0]).join('') ?? '';
  }, [name]);

  return (
    <Grid.Container alignItems="center" css={{ gap: '$12' }}>
      <Grid>
        <Badge
          content={isVerified ? 'verified' : 'unverified'}
          variant={isVerified ? 'flat' : 'bordered'}
          color={isVerified ? 'success' : 'default'}
          size="xs"
        >
          <Avatar
            text={userInitials}
            textColor="primary"
            css={{ size: '$28' }}
            src={avatarUrl}
          />
        </Badge>
      </Grid>
      <Grid xs>
        <div>
          {youtubeUsername && <Text color="$accents6">{youtubeUsername}</Text>}
          <Text h2 size="$3xl" css={{ margin: 0 }}>{name}</Text>
          <NextLink href={`/profile/${currentUserId}/connections`}>
            {`${connectionsCount} connections`}
          </NextLink>
        </div>
      </Grid>
      <Grid>
        <Grid.Container alignItems="center" css={{ gap: '$4' }}>
          <Grid>
            {isMyAccount
              ? (
                <Button rounded flat auto icon={<Icon icon="edit" />}>
                  Edit profile
                </Button>
              ) : (
                <ConnectionButton
                  inviteeId={user._id}
                  inviteeName={user.name}
                  hasInvitation={user.hasInvitation ?? false}
                  hasConnection={user.hasConnection ?? false}
                />
              )}
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
};
