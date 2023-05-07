import { Grid, Input } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { COUNTRIES } from '../../../constants/countries';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { Icon } from '../../various/Icon';
import { Select } from '../../various/Select';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep1: React.FC<Props> = ({ control, errors, register }) => {
  return (
    <Grid.Container gap={1} alignItems="flex-start">
      <Grid xs={12} sm={6}>
        <Input
          type="email"
          labelLeft="Email"
          aria-label="Email"
          placeholder="john.doe@domain.com"
          fullWidth
          status={errors.email && 'error'}
          helperText={errors.email?.message}
          helperColor="error"
          {...register('email', VALIDATION_RULES.EMAIL)}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Input.Password
          labelLeft="Password"
          aria-label="Password"
          fullWidth
          visibleIcon={<Icon icon="show" />}
          hiddenIcon={<Icon icon="hide" />}
          status={errors.password && 'error'}
          helperText={errors.password?.message}
          helperColor="error"
          {...register('password', VALIDATION_RULES.PASSWORD)}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Input
          labelLeft="Name"
          aria-label="Name"
          placeholder="John Doe"
          fullWidth
          status={errors.name && 'error'}
          helperText={errors.name?.message}
          helperColor="error"
          {...register('name', VALIDATION_RULES.SHORT_TEXT)}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Select
          labelLeft="Country"
          aria-label="Country"
          placeholder="Select..."
          fullWidth
          status={errors.country && 'error'}
          options={COUNTRIES}
          name="country"
          control={control}
          rules={VALIDATION_RULES.REQUIRED}
        />
      </Grid>
    </Grid.Container>
  );
};
