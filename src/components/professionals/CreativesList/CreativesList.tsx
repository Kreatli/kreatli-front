import { Container, Grid, Spacer } from '@nextui-org/react';
import React from 'react';

import { CreativeCard } from './CreativeCard';
import { Filters } from './Filters';

export const CreativesList: React.FC = () => {
  return (
    <Container lg>
      <Filters />
      <Spacer y={1} />
      <Grid.Container>
        {[1, 2, 3, 4, 5].map((id) => (
          <Grid key={id} xs={4}>
            <CreativeCard />
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  );
};
