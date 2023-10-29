import { Skeleton, User } from '@nextui-org/react';
import { COUNTRY_LABELS } from 'constants/countries';
import { ChatContext } from 'contexts/Chat';
import Link from 'next/link';
import React from 'react';

export const ChatHeader = () => {
  const { participant } = React.useContext(ChatContext);

  return (
    <div className="flex">
      {participant
        ? (
          <Link href={`/profile/${participant._id}`} className="flex">
            <User
              name={participant.name}
              description={COUNTRY_LABELS[participant.country]}
              className="gap-4"
              classNames={{ name: 'text-large font-semibold', description: 'text-sm' }}
              avatarProps={{ src: participant.avatarUrl, className: 'w-12 h-12' }}
            />
          </Link>
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
