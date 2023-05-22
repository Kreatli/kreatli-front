import { Button, Card, Container, Grid, Row, Spacer, Text, User } from '@nextui-org/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

import { Icon } from '../../../components/various/Icon';
import { useUser } from '../../../hooks/useUser';
import { requestUserConnections } from '../../../services/user';

const Connections: React.FC = () => {
  const router = useRouter();
  const userId = router.query.id as string | undefined;

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
  const pageTitle = `Kreatli | ${user?.name ?? ''}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container sm>
        <Text h3>
          Invitations
        </Text>
        <Grid.Container css={{ gap: '$8' }}>
          {invitations?.map(({ _id, message, inviter }) => (
            <Grid xs={12}>
              <Card key={_id} variant="bordered">
                <Card.Header>
                  <Row justify="space-between" align="center">
                    <User
                      src={inviter.avatarUrl}
                      description={inviter.description}
                      size="xl"
                      bordered
                      name={inviter.name}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button icon={<Icon icon="check" />} auto rounded flat />
                      <Button icon={<Icon icon="cross" />} auto rounded flat />
                    </div>
                  </Row>
                </Card.Header>
                {message && (
                  <Card.Body css={{ p: '$0 $10 $6' }}>
                    <Text>{message}</Text>
                  </Card.Body>
                )}
              </Card>
            </Grid>
          ))}
        </Grid.Container>
        <Spacer y={2} />
        <Text h3>
          Connections
        </Text>
        {JSON.stringify(connections, null, 2)}
      </Container>
    </>
  );
};

export default Connections;
