import { Grid, Input } from '@nextui-org/react';
import React from 'react';

import { Icon } from '../../various/Icon';

export const Filters: React.FC = () => {
  return (
    <Grid.Container>
      <Grid xs={12} sm={6} md={4} lg={3}>
        <Input
          type="search"
          fullWidth
          placeholder="Search"
          contentLeft={<Icon icon="search" />}
        />
      </Grid>
    </Grid.Container>
  );
};
