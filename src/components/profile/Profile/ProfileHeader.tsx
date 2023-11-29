import { Avatar, Button, Link } from '@nextui-org/react';
import { TierImage } from 'components/various/TierImage';
import NextLink from 'next/link';
import React from 'react';

import { useBreakpointValue } from '../../../hooks/useBreakpointValue';
import { useSession } from '../../../hooks/useSession';
import { User } from '../../../typings/user';
import { Icon } from '../../various/Icon';
import { ConnectionButton } from '../Connections/ConnectionButton';
import { ProfileBadge } from './ProfileBadge';

interface Props {
  user: User.Type;
}

export const ProfileHeader = ({ user }: Props) => {
  const { _id: userId, connectionsCount, role, name, avatarUrl, isVerified, tier } = user;
  const { currentUserId } = useSession();

  const isMobile = useBreakpointValue({ SM: false }, true);
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
    <div className="flex items-center gap-6 sm:gap-10">
      <ProfileBadge size="lg" isVerified={isVerified}>
        <Avatar
          name={userInitials}
          isBordered
          className="w-24 h-24 sm:w-28 sm:h-28"
          src={avatarUrl}
        />
      </ProfileBadge>
      <div className="flex-1">
        {portfolioUrl && (
          <Link href={portfolioUrl} target="_blank" className="flex items-center gap-1 text-gray-400">
            <Icon icon="link" size={16} />
            portfolio
          </Link>
        )}
        {youtubeUsername && <p className="text-small text-gray-400">{youtubeUsername}</p>}
        <h2 className="text-3xl font-semibold">
          {name}
          <TierImage tier={tier} className="w-10 h-10" isInline />
        </h2>
        <Link as={NextLink} href={`/profile/${userId}/connections`} className="text-small">
          {`${connectionsCount} connection${connectionsCount === 1 ? '' : 's'}`}
          {user.invitations.length > 0 && isMyAccount ? ` • ${user.invitations.length} invite${connectionsCount === 1 ? '' : 's'}` : ''}
        </Link>
      </div>
      {isMyAccount
        ? (
          <Button aria-label="Edit profile" isIconOnly={isMobile} variant="flat" color="secondary" startContent={<Icon icon="edit" size={20} />}>
            {!isMobile && 'Edit profile'}
          </Button>
        ) : (
          <ConnectionButton
            userId={user._id}
            inviteeName={user.name}
            hasInvitation={user.hasInvitation ?? false}
            hasConnection={user.hasConnection ?? false}
          />
        )}
    </div>
  );
};
