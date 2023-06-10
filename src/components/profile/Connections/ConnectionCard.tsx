import { Avatar, Card, Col, Grid, Text } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { User as UserType } from '../../../typings/user';
import { maxNLinesStyles } from '../../../utils/styles';
import { getUserSkills } from '../../../utils/user';
import { ProfileBadge } from '../Profile/ProfileBadge';

interface Props {
  user: UserType.ShortInfo;
}

export const ConnectionCard = ({ user }: Props) => {
  const maxLines = user.role === 'creator'
    ? 1
    : 2;

  return (
    <Card isHoverable>
      <Link href={`/profile/${user._id}`}>
        <Card.Body>
          <Grid.Container css={{ gap: '$10' }} alignItems="center">
            <Grid>
              <ProfileBadge isVerified={user.isVerified}>
                <Avatar src={user.avatarUrl} pointer css={{ size: '$20' }} />
              </ProfileBadge>
            </Grid>
            <Grid xs>
              <Col>
                <Text size="$lg" weight="medium">{user.name}</Text>
                {user.role === 'creator' && <Text size="$sm" color="$accents6">{user.youtube.customUrl}</Text>}
                <Text size="$sm" css={maxNLinesStyles(maxLines)}>{getUserSkills(user)}</Text>
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
