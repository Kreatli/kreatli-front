import { Select, SelectItem } from '@heroui/react';
import React from 'react';
import { Control, FieldErrors, useController, UseFormRegister } from 'react-hook-form';

import { AVAILABILITY_OPTIONS, DURATION_OPTIONS } from '../../../../constants/marketplace/availability';
import { LOCATION_OPTIONS } from '../../../../constants/marketplace/location';
import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const JobsCreationStep4 = ({ control, register, errors }: Props) => {
  const { field: availabilityField } = useController({ control, name: 'availability' });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4">
      <Select
        label="Availability"
        disallowEmptySelection
        isInvalid={!!errors.availability}
        {...register('availability', VALIDATION_RULES.REQUIRED)}
      >
        {AVAILABILITY_OPTIONS.map((option) => (
          <SelectItem key={option.value}>{option.label}</SelectItem>
        ))}
      </Select>
      {availabilityField.value === 'project-base' && (
        <Select
          label="Duration"
          disallowEmptySelection
          isInvalid={!!errors.availabilityDuration}
          {...register('availabilityDuration', VALIDATION_RULES.REQUIRED)}
        >
          {DURATION_OPTIONS.map((option) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      )}
      <div className="col-span-2">
        <Select
          label="Location"
          disallowEmptySelection
          isInvalid={!!errors.location}
          {...register('location', VALIDATION_RULES.REQUIRED)}
        >
          {LOCATION_OPTIONS.map((option) => (
            <SelectItem key={option.value}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
