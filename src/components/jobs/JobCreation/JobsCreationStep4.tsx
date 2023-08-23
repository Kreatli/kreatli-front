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
    <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4">
      <Select
        label="Availability"
        placeholder="Select..."
        fullWidth
        validationState={errors.availability && 'invalid'}
        options={AVAILABILITY_OPTIONS}
        name="availability"
        control={control}
        rules={VALIDATION_RULES.REQUIRED}
      />
      {availabilityField.value === 'project-base' && (
        <Select
          label="Duration"
          placeholder="Select..."
          fullWidth
          validationState={errors.availabilityDuration && 'invalid'}
          options={DURATION_OPTIONS}
          name="availabilityDuration"
          control={control}
          rules={VALIDATION_RULES.REQUIRED}
        />
      )}
      <div className="col-span-2">
        <Select
          label="Location"
          placeholder="Select..."
          fullWidth
          validationState={errors.location && 'invalid'}
          options={LOCATION_OPTIONS}
          name="location"
          control={control}
          rules={VALIDATION_RULES.REQUIRED}
        />
      </div>
    </div>
  );
};
