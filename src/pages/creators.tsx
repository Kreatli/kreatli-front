import { Card, Container, Grid, Text } from '@nextui-org/react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';

import { requestCreators } from '../services/users';

const Creators: React.FC = () => {
  const { data } = useQuery('creators', requestCreators);

  return (
    <>
      <Head>
        <title>Creators | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container lg>
        <Text h2>Find creators</Text>
        <Grid.Container gap={1}>
          {data?.map((user) => (
            <Grid key={user._id} xs={4} sm={3} md={2}>
              <Link href={`/profile/${user._id}`}>
                <Card isHoverable>
                  <Card.Image src={user.avatarUrl} />
                  <Card.Footer>
                    {user.name}
                  </Card.Footer>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid.Container>
      </Container>
    </>
  );
};

export default Creators;
