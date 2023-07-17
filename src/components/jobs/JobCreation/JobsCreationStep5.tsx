import { Grid, Textarea } from '@nextui-org/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { ADDITIONAL_INFORMATION_PLACEHOLDER, DefaultValues } from './constants';

interface Props {
  errors: FieldErrors<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
}

export const JobsCreationStep5: React.FC<Props> = ({ errors, register }) => {
  return (
    <Grid.Container gap={1} alignItems="flex-start">
      <Grid xs={12}>
        <Textarea
          placeholder={ADDITIONAL_INFORMATION_PLACEHOLDER}
          aria-label="Additional information"
          fullWidth
          status={errors.additionalInformation && 'error'}
          helperText={errors.additionalInformation?.message}
          helperColor="error"
          {...register('additionalInformation')}
        />
      </Grid>
    </Grid.Container>
  );
};
