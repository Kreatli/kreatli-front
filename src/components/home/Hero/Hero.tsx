import { Container, Grid, Spacer, Text } from '@nextui-org/react';
import React from 'react';

import { CardCTA } from './CardCTA';

export const Hero: React.FC = () => {
  return (
    <Container>
      <Spacer y={3} />
      <Grid.Container alignItems="center">
        <Grid lg={6}>
          <Text h1 size={60} weight="bold" css={{ textGradient: '45deg, $blue600 -20%, $pink600 50%' }}>
            Professional social media platform for YouTube
          </Text>
        </Grid>
        <Grid lg={6}>
          <CardCTA />
        </Grid>
      </Grid.Container>
    </Container>
  );
};
