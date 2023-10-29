import { Textarea } from '@nextui-org/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { ADDITIONAL_INFORMATION_PLACEHOLDER, DefaultValues } from './constants';

interface Props {
  errors: FieldErrors<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
}

export const JobsCreationStep5: React.FC<Props> = ({ errors, register }) => {
  return (
    <Textarea
      placeholder={ADDITIONAL_INFORMATION_PLACEHOLDER}
      aria-label="Additional information"
      fullWidth
      isInvalid={!!errors.additionalInformation}
      errorMessage={errors.additionalInformation?.message}
      {...register('additionalInformation')}
    />
  );
};
