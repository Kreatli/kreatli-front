import { Grid, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { DefaultValues, DESCRIPTION_PLACEHOLDER, SHORT_DESCRIPTION_PLACEHOLDER } from './constants';

interface Props {
  errors: FieldErrors<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
}

export const JobsCreationStep1: React.FC<Props> = ({ errors, register }) => {
  return (
    <Grid.Container gap={1} alignItems="flex-start">
      <Grid xs={12}>
        <Input
          labelLeft="Title"
          aria-label="Job title"
          placeholder="YouTube Video Editor"
          fullWidth
          status={errors.title && 'error'}
          helperText={errors.title?.message}
          helperColor="error"
          {...register('title', VALIDATION_RULES.SHORT_TEXT)}
        />
      </Grid>
      <Grid xs={12}>
        <Textarea
          label="Short description"
          placeholder={SHORT_DESCRIPTION_PLACEHOLDER}
          aria-label="Short description"
          fullWidth
          status={errors.shortDescription && 'error'}
          helperText={errors.shortDescription?.message}
          helperColor="error"
          {...register('shortDescription', VALIDATION_RULES.SHORT_TEXT)}
        />
      </Grid>
      <Grid xs={12}>
        <Textarea
          label="Description"
          placeholder={DESCRIPTION_PLACEHOLDER}
          aria-label="Description"
          fullWidth
          minRows={5}
          status={errors.description && 'error'}
          helperText={errors.description?.message}
          helperColor="error"
          {...register('description', VALIDATION_RULES.DESCRIPTION.MIN_100)}
        />
      </Grid>
    </Grid.Container>
  );
};
