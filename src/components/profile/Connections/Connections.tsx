import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';

import { useSession } from '../../../hooks/useSession';
import { requestUserConnections } from '../../../services/user';
import { Common } from '../../../typings/common';
import { EmptyState } from '../../various/EmptyState';
import { LazyList } from '../../various/LazyList';
import { ConnectionCard } from './ConnectionCard';
import { ConnectionsSkeleton } from './ConnectionsSkeleton';
import { InvitationCard } from './InvitationCard';

interface Props {
  userId: Common.MaybeId;
}

const LIMIT = 10;

export const Connections = ({ userId }: Props) => {
  const { currentUserId } = useSession();

  const { isFetchingNextPage, isFetching, isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    {
      meta: {
        showErrorNotification: true,
      },
      initialPageParam: 1,
      queryKey: ['user', userId, 'connections'],
      queryFn: userId
        ? ({ pageParam = 1 }) => requestUserConnections(userId, { limit: LIMIT, offset: (pageParam - 1) * LIMIT })
        : undefined,
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length * LIMIT < (lastPage?.connectionsCount ?? 0)
          ? allPages.length + 1
          : undefined;
      },
    },
  );

  const connections = React.useMemo(() => {
    return data?.pages.flatMap((page) => page?.connections ?? []) ?? [];
  }, [data?.pages]);

  const invitations = React.useMemo(() => {
    return data?.pages[0]?.invitations ?? [];
  }, [data?.pages]);

  const connectionsCount = React.useMemo(() => {
    return data?.pages[0]?.connectionsCount ?? 0;
  }, [data?.pages]);

  const isMyAccount = currentUserId === userId;
  const hasInvitations = invitations.length > 0;
  const hasConnections = connections.length > 0;

  const shouldShowEmptyState = !isFetching && !hasConnections;

  return (
    <div className="container max-w-screen-lg mx-auto px-6">
      {isMyAccount && hasInvitations && (
        <>
          <h4 className="text-xl font-semibold mb-4">Invitations</h4>
          <div className="flex flex-col gap-4 mb-8">
            {invitations?.map((invitation) => (
              <InvitationCard key={invitation._id} invitation={invitation} />
            ))}
          </div>
        </>
      )}
      <h3 className="text-2xl font-semibold mb-4">Connections ({connectionsCount})</h3>
      <LazyList isLoading={isFetchingNextPage} hasMore={hasNextPage} onLoadMore={fetchNextPage}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {connections?.map((connection) => (
            <ConnectionCard key={connection._id} user={connection} isMyAccount={isMyAccount} />
          ))}
          {isLoading && <ConnectionsSkeleton />}
        </div>
      </LazyList>
      {shouldShowEmptyState && (
        <EmptyState title="You don't have any connections yet" />
      )}
    </div>
  );
};
