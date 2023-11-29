import { Avatar, Button, Skeleton } from '@nextui-org/react';
import { ProfileBadge } from 'components/profile/Profile/ProfileBadge';
import { Icon } from 'components/various/Icon';
import { TierImage } from 'components/various/TierImage';
import { COUNTRY_LABELS } from 'constants/countries';
import { ChatContext } from 'contexts/Chat';
import { useBreakpointValue } from 'hooks/useBreakpointValue';
import NextLink from 'next/link';
import React from 'react';

export const ChatHeader = () => {
  const { participant } = React.useContext(ChatContext);
  const isMobile = useBreakpointValue({ MD: false }, true);

  const userName = (
    <>
      {participant?.name}
      {participant?.tier && <TierImage tier={participant.tier} className="w-6 h-6" isInline />}
    </>
  );

  if (isMobile) {
    return (
      <div className="flex w-full justify-between items-center">
        <Button as={NextLink} className="text-foreground" variant="light" href="/chat" isIconOnly>
          <Icon icon="arrowLeft" />
        </Button>
        {participant
          ? (
            <>
              <NextLink href={`/profile/${participant._id}`} className="text-center">
                <div className="text-md font-semibold">{userName}</div>
                <div className="text-sm text-default-400">{COUNTRY_LABELS[participant.country]}</div>
              </NextLink>
              <ProfileBadge isVerified={participant.isVerified} size="sm">
                <Avatar as={NextLink} href={`/profile/${participant._id}`} src={participant.avatarUrl} className="w-12 h-12" />
              </ProfileBadge>
            </>
          )
          : (
            <>
              <div className="flex flex-col justify-center items-center gap-2">
                <Skeleton className="h-4 w-40 rounded-md" />
                <Skeleton className="h-4 w-60 rounded-md" />
              </div>
              <Skeleton className="w-12 h-12 rounded-full" />
            </>
          )}
      </div>
    );
  }

  return (
    <div className="flex">
      {participant
        ? (
          <NextLink href={`/profile/${participant._id}`} className="flex">
            <div className="flex items-center gap-4">
              <ProfileBadge isVerified={participant.isVerified} size="sm">
                <Avatar src={participant.avatarUrl} className="w-12 h-12" />
              </ProfileBadge>
              <div>
                <h3 className="text-large font-semibold">{userName}</h3>
                <p className="text-small text-default-400">{COUNTRY_LABELS[participant.country]}</p>
              </div>
            </div>
          </NextLink>
        ) : (
          <div className="flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-40 rounded-md" />
              <Skeleton className="h-4 w-60 rounded-md" />
            </div>
          </div>
        )}
    </div>
  );
};
