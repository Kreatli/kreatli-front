import { Grid } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, useController } from 'react-hook-form';

import { AVAILABILITY_OPTIONS, DURATION_OPTIONS } from '../../../constants/availability';
import { LOCATION_OPTIONS } from '../../../constants/location';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { Select } from '../../various/Select';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const JobsCreationStep4: React.FC<Props> = ({ control, errors }) => {
  const { field: availabilityField } = useController({ control, name: 'availability' });

  return (
    <Grid.Container gap={1} alignItems="flex-start">
      <Grid xs={12} sm={6}>
        <Select
          labelLeft="Availability"
          aria-label="Availability"
          placeholder="Select..."
          fullWidth
          status={errors.availability && 'error'}
          options={AVAILABILITY_OPTIONS}
          name="availability"
          control={control}
          rules={VALIDATION_RULES.REQUIRED}
        />
      </Grid>
      {availabilityField.value === 'project-base' && (
        <Grid xs={12} sm={6}>
          <Select
            labelLeft="Duration"
            aria-label="Duration"
            placeholder="Select..."
            fullWidth
            status={errors.availabilityDuration && 'error'}
            options={DURATION_OPTIONS}
            name="availabilityDuration"
            control={control}
            rules={VALIDATION_RULES.REQUIRED}
          />
        </Grid>
      )}
      <Grid xs={12}>
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
