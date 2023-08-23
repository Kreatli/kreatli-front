import { Avatar } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';

import { COUNTRY_LABELS } from '../../../constants/countries';
import { requestUsersByIds } from '../../../services/users';
import { Common } from '../../../typings/common';
import { ProfileBadge } from '../Profile/ProfileBadge';

interface Props {
  ids: Common.Id[];
}

export const RecentConnections = ({ ids }: Props) => {
  const { data: connections = [] } = useQuery(['users', ...ids], () => requestUsersByIds(ids), {
    refetchOnMount: false,
  });

  if (!connections.length) {
    return null;
  }

  return (
    <>
      <h3 className="text-2xl font-semibold mt-8 mb-2">Recent connections</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {connections.map((user) => (
          <NextLink key={user._id} href={`/profile/${user._id}`} color="foreground" className="flex flex-col items-center">
            <ProfileBadge isVerified={user.isVerified} size="sm">
              <Avatar src={user.avatarUrl} size="lg" />
            </ProfileBadge>
            <h5 className="text-lg font-semibold leading-4 mt-2 mb-1 text-center">{user.name}</h5>
            <p className="text-sm text-gray-400 text-center">{COUNTRY_LABELS[user.country]}</p>
          </NextLink>
        ))}
      </div>
    </>
  );
};
