import { Container, Grid, Spacer, Text } from '@nextui-org/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import { ConnectionCard } from '../../../components/profile/ConnectionCard';
import { InvitationCard } from '../../../components/profile/InvitationCard';
import { useSession } from '../../../hooks/useSession';
import { useUser } from '../../../hooks/useUser';
import { requestUserConnections } from '../../../services/user';
import { Common } from '../../../typings/common';

const Connections: React.FC = () => {
  const router = useRouter();
  const { currentUserId } = useSession();
  const userId = router.query.id as Common.MaybeId;

  const fetchUserConnections = () => {
    if (userId) {
      return requestUserConnections(userId);
    }

    return undefined;
  };

  const { user } = useUser(userId);
  const { data } = useQuery(['user', userId, 'connections'], fetchUserConnections, {
    onError: () => {
      // TODO: show notification error
    },
  });

  const { connections, invitations } = data ?? {};
  const isMyAccount = currentUserId === userId;
  const hasInvitations = (invitations?.length ?? 0) > 0;
  const pageTitle = `Kreatli | ${user?.name ?? ''}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
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
        <Grid.Container css={{ gap: '$8' }}>
          {connections?.map((connection) => (
            <Grid xs={12}>
              <ConnectionCard key={connection._id} user={connection} />
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </>
  );
};

export default Connections;
