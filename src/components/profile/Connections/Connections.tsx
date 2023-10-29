import { EmptyState } from 'components/various/EmptyState';
import React from 'react';
import { useInfiniteQuery } from 'react-query';

import { useSession } from '../../../hooks/useSession';
import { requestUserConnections } from '../../../services/user';
import { Common } from '../../../typings/common';
import { LazyList } from '../../various/LazyList';
import { ConnectionCard } from './ConnectionCard';
import { InvitationCard } from './InvitationCard';

interface Props {
  userId: Common.MaybeId;
}

const LIMIT = 10;

export const Connections = ({ userId }: Props) => {
  const { currentUserId } = useSession();

  const { isFetchingNextPage, isFetching, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['user', userId, 'connections'],
    ({ pageParam = 1 }) => userId && requestUserConnections(userId, { limit: LIMIT, offset: (pageParam - 1) * LIMIT }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length * LIMIT < (lastPage?.connectionsCount ?? 0)
          ? allPages.length + 1
          : undefined;
      },
      onError: () => {
        // TODO: show notification error
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

  // TODO: skeleton + loader
  // const shouldShowSkeleton = isFetching && !hasConnections;
  // const shouldShowLoader = isFetching && !isFetchingNextPage && hasConnections;
  const shouldShowEmptyState = !isFetching && !hasConnections;

  return (
    <div className="container max-w-screen-lg mx-auto px-6">
      {isMyAccount && hasInvitations && (
        <>
          <h4 className="text-xl font-semibold mb-2">Invitations</h4>
          <div className="flex flex-col gap-4 mb-8">
            {invitations?.map((invitation) => (
              <InvitationCard key={invitation._id} invitation={invitation} />
            ))}
          </div>
        </>
      )}
      <h3 className="text-2xl font-semibold mb-2">Connections ({connectionsCount})</h3>
      <LazyList isLoading={isFetchingNextPage} hasMore={hasNextPage} onLoadMore={fetchNextPage}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {connections?.map((connection) => (
            <ConnectionCard key={connection._id} user={connection} isMyAccount={isMyAccount} />
          ))}
        </div>
      </LazyList>
      {shouldShowEmptyState && (
        <EmptyState title="You don't have any connections yet" />
      )}
    </div>
  );
};
