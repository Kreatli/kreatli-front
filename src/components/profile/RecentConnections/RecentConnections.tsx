import { Avatar, Grid, Row, Text } from '@nextui-org/react';
import Link from 'next/link';
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

  return (
    <Grid.Container gap={2}>
      {connections.map((user) => (
        <Grid key={user._id} xs={4} sm={2}>
          <Link href={`/profile/${user._id}`} style={{ display: 'block', width: '100%' }}>
            <Row justify="center">
              <ProfileBadge isVerified={user.isVerified} size="sm">
                <Avatar src={user.avatarUrl} pointer size="xl" />
              </ProfileBadge>
            </Row>
            <Row justify="center">
              <Text size="$sm" color="$accents6" css={{ textAlign: 'center' }}>{COUNTRY_LABELS[user.country]}</Text>
            </Row>
            <Row justify="center">
              <Text h5 css={{ textAlign: 'center' }}>{user.name}</Text>
            </Row>
          </Link>
        </Grid>
      ))}
    </Grid.Container>
  );
};
