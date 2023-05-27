import { Container, Grid, Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { useQuery } from 'react-query';

import { useSession } from '../../../hooks/useSession';
import { requestUserConnections } from '../../../services/user';
import { Common } from '../../../typings/common';
import { ConnectionCard } from './ConnectionCard';
import { InvitationCard } from './InvitationCard';

interface Props {
  userId: Common.MaybeId;
}

export const Connections = ({ userId }: Props) => {
  const { currentUserId } = useSession();

  const fetchUserConnections = () => {
    if (userId) {
      return requestUserConnections(userId);
    }

    return undefined;
  };

  const { data } = useQuery(['user', userId, 'connections'], fetchUserConnections, {
    onError: () => {
      // TODO: show notification error
    },
  });

  const { connections, invitations } = data ?? {};
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
        Connections
      </Text>
      <Grid.Container gap={2} css={{ mx: '-$10' }}>
        {connections?.map((connection) => (
          <Grid xs={12} sm={6}>
            <ConnectionCard key={connection._id} user={connection} />
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
};
