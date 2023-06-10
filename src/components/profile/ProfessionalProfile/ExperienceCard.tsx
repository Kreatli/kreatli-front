import { Avatar, Card, Grid, Text } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { Icon } from '../../various/Icon';

interface Props {
  imageUrl?: string;
  description: string;
  companyName: string;
  companyUrl: string;
}

export const ExperienceCard = ({ description, companyName, companyUrl, imageUrl }: Props) => {
  return (
    <Card>
      <Card.Header>
        <Grid.Container css={{ gap: '$4' }}>
          <Grid xs>
            <Grid.Container css={{ gap: '$8' }} alignItems="center">
              <Grid>
                <Avatar
                  src={imageUrl}
                  icon={<Icon icon="building" />}
                  size="lg"
                />
              </Grid>
              <Grid alignContent="center">
                <Text size="$lg" weight="semibold">{companyName}</Text>
              </Grid>
            </Grid.Container>
          </Grid>
          <Grid>
            <Text size="$sm">
              <Link href={companyUrl} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Icon icon="link" size={16} />
                website
              </Link>
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Footer>
        <Text size="$sm" css={{ whiteSpace: 'pre-wrap' }}>{description}</Text>
      </Card.Footer>
    </Card>
  );
};
