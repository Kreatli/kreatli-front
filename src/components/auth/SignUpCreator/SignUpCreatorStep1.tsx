import { Grid, Input } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { COUNTRIES } from '../../../constants/countries';
import { Icon } from '../../various/Icon';
import { Select } from '../../various/Select';
import { DefaultValues, VALIDATIONS } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
}

export const SignUpCreatorStep1: React.FC<Props> = ({ control, errors, register }) => {
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
          {...register('email', VALIDATIONS.email)}
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
          {...register('password', VALIDATIONS.password)}
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
          {...register('name', VALIDATIONS.name)}
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
          rules={VALIDATIONS.country}
          helperText={errors.country?.message}
        />
      </Grid>
    </Grid.Container>
  );
};
