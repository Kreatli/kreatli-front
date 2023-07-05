import { Grid } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { DURATION_OPTIONS } from '../../../constants/duration';
import { LOCATION_OPTIONS } from '../../../constants/location';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { Select } from '../../various/Select';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const JobsCreationStep4: React.FC<Props> = ({ control, errors }) => {
  return (
    <Grid.Container gap={1} alignItems="flex-start">
      <Grid xs={12} sm={6}>
        <Select
          labelLeft="Duration"
          aria-label="Duration"
          placeholder="Select..."
          fullWidth
          status={errors.duration && 'error'}
          options={DURATION_OPTIONS}
          name="duration"
          control={control}
          rules={VALIDATION_RULES.REQUIRED}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Select
          labelLeft="Location"
          aria-label="Location"
          placeholder="Select..."
          fullWidth
          status={errors.location && 'error'}
          options={LOCATION_OPTIONS}
          name="location"
          control={control}
          rules={VALIDATION_RULES.REQUIRED}
        />
      </Grid>
    </Grid.Container>
  );
};
