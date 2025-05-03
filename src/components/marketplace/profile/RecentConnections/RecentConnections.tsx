import { Avatar } from '@heroui/react';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';
import React from 'react';

import { COUNTRY_LABELS } from '../../../../constants/countries';
import { requestUsersByIds } from '../../../../services/marketplace/users';
import { Common } from '../../../../typings/common';

interface Props {
  ids: Common.Id[];
}

export const RecentConnections = ({ ids }: Props) => {
  const { data: connections = [] } = useQuery({
    queryKey: ['users', ...ids],
    queryFn: () => requestUsersByIds(ids),
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
          <NextLink
            key={user._id}
            href={`/marketplace/profile/${user._id}`}
            color="foreground"
            className="flex flex-col items-center"
          >
            <Avatar name={user.name} src={user.avatarUrl} size="lg" />
            <h5 className="text-medium font-semibold leading-4 mt-2 mb-1 text-center">{user.name}</h5>
            <p className="text-sm text-gray-400 text-center">{COUNTRY_LABELS[user.country]}</p>
          </NextLink>
        ))}
      </div>
    </>
  );
};
