import { Avatar, Button, Grid, Text } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { User } from '../../../typings/user';
import { Icon } from '../../various/Icon';
import { ProfileBadge } from './ProfileBadge';
import { ProfileHeaderButton } from './ProfileHeaderButton';

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
  const portfolioUrl = role === 'professional'
    ? user.portfolioUrl
    : undefined;

  const userInitials = React.useMemo(() => {
    return name.split(' ').map((part: string) => part[0]).join('') ?? '';
  }, [name]);

  return (
    <Grid.Container alignItems="center" css={{ gap: '$12' }}>
      <Grid>
        <ProfileBadge isVerified={isVerified}>
          <Avatar
            text={userInitials}
            textColor="primary"
            css={{ size: '$28' }}
            src={avatarUrl}
          />
        </ProfileBadge>
      </Grid>
      <Grid xs>
        <div>
          {portfolioUrl && (
            <Text size="$sm">
              <Link href={portfolioUrl} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--nextui-colors-accents6)' }}>
                <Icon icon="link" size={16} />
                portfolio
              </Link>
            </Text>
          )}
          {youtubeUsername && <Text color="$accents6">{youtubeUsername}</Text>}
          <Text h2 size="$3xl" css={{ margin: 0 }}>{name}</Text>
          <Link href={`/profile/${userId}/connections`}>
            {`${connectionsCount} connection${connectionsCount === 1 ? '' : 's'}`}
            {user.invitations.length > 0 && isMyAccount ? ` • ${user.invitations.length} invite${connectionsCount === 1 ? '' : 's'}` : ''}
          </Link>
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
                <ProfileHeaderButton
                  userId={user._id}
                  inviteeName={user.name}
                  hasInvitation={user?.invitations.some(({ inviter }) => inviter === currentUserId)}
                  hasConnection={user.hasConnection ?? false}
                />
              )}
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
  );
};
