import { Avatar, Card, Col, Grid, Text } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { COUNTRY_LABELS } from '../../../constants/countries';
import { User as UserType } from '../../../typings/user';
import { maxNLinesStyles } from '../../../utils/styles';

interface Props {
  user: UserType.Base;
}

export const ConnectionCard = ({ user }: Props) => {
  return (
    <Card isHoverable>
      <Link href={`/profile/${user._id}`}>
        <Card.Body>
          <Grid.Container css={{ gap: '$8' }}>
            <Grid>
              <Avatar src={user.avatarUrl} css={{ size: '$20' }} />
            </Grid>
            <Grid xs>
              <Col>
                <Text size="$lg" weight="medium">{user.name}</Text>
                <Text size="$sm" color="$accents6">{COUNTRY_LABELS[user.country]}</Text>
                <Text size="$sm" css={maxNLinesStyles(1)}>{user.description}</Text>
              </Col>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Link>
      <Card.Divider />
      <Card.Footer css={{ justifyContent: 'space-between' }}>
        <Link href={`/profile/${user._id}`}>View profile</Link>
        <Link href="/">Message</Link>
      </Card.Footer>
    </Card>
  );
};
