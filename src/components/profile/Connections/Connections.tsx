import { Container, Grid, Spacer, Text } from '@nextui-org/react';
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

  const { isLoading, data, hasNextPage, fetchNextPage } = useInfiniteQuery(
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

  const handleLoadMore = () => {
    if (isLoading) {
      return;
    }

    fetchNextPage();
  };

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
  const hasInvitations = (invitations?.length ?? 0) > 0;

  return (
    <Container sm>
      {isMyAccount && hasInvitations && (
        <>
          <Text h3>
            Invitations
          </Text>
          <Grid.Container css={{ gap: '$8' }}>
            {invitations?.map((invitation) => (
              <Grid xs={12}>
                <InvitationCard key={invitation._id} invitation={invitation} />
              </Grid>
            ))}
          </Grid.Container>
          <Spacer y={2} />
        </>
      )}
      <Text h3>
        Connections ({connectionsCount})
      </Text>
      <LazyList hasMore={hasNextPage ?? false} onLoadMore={handleLoadMore}>
        <Grid.Container gap={2} css={{ mx: '-$10' }}>
          {connections?.map((connection) => (
            <Grid xs={12} sm={6}>
              <ConnectionCard key={connection._id} user={connection} />
            </Grid>
          ))}
        </Grid.Container>
      </LazyList>
    </Container>
  );
};
