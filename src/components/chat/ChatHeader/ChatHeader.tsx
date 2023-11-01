import { Avatar, Button, Skeleton, User } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { COUNTRY_LABELS } from 'constants/countries';
import { ChatContext } from 'contexts/Chat';
import { useBreakpointValue } from 'hooks/useBreakpointValue';
import NextLink from 'next/link';
import React from 'react';

export const ChatHeader = () => {
  const { participant } = React.useContext(ChatContext);
  const isMobile = useBreakpointValue({ MD: false }, true);

  if (isMobile) {
    return (
      <div className="flex w-full justify-between items-center">
        <Button as={NextLink} className="text-foreground" variant="light" href="/chat" isIconOnly>
          <Icon icon="arrowLeft" />
        </Button>
        {participant
          ? (
            <>
              <div className="text-center">
                <div className="text-md font-semibold">{participant.name}</div>
                <div className="text-sm text-default-400">{COUNTRY_LABELS[participant.country]}</div>
              </div>
              <Avatar src={participant.avatarUrl} className="w-12 h-12" />
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
            <User
              name={participant.name}
              description={COUNTRY_LABELS[participant.country]}
              className="gap-4"
              classNames={{ name: 'text-large font-semibold', description: 'text-sm' }}
              avatarProps={{ src: participant.avatarUrl, className: 'w-12 h-12' }}
            />
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
