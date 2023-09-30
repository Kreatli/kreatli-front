import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, useController, UseFormRegister } from 'react-hook-form';

import { AVAILABILITY_OPTIONS, DURATION_OPTIONS } from '../../../constants/availability';
import { LOCATION_OPTIONS } from '../../../constants/location';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const JobsCreationStep4: React.FC<Props> = ({ control, register, errors }) => {
  const { field: availabilityField } = useController({ control, name: 'availability' });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4">
      <Select
        label="Availability"
        validationState={errors.availability && 'invalid'}
        {...register('availability', VALIDATION_RULES.REQUIRED)}
      >
        {AVAILABILITY_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
      </Select>
      {availabilityField.value === 'project-base' && (
        <Select
          label="Duration"
          validationState={errors.availabilityDuration && 'invalid'}
          {...register('availabilityDuration', VALIDATION_RULES.REQUIRED)}
        >
          {DURATION_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      )}
      <div className="col-span-2">
        <Select
          label="Location"
          validationState={errors.location && 'invalid'}
          {...register('location', VALIDATION_RULES.REQUIRED)}
        >
          {LOCATION_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
