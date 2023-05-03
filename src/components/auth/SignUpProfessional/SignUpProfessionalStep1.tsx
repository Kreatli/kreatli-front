import { Grid, Input } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { COUNTRIES } from '../../../constants/countries';
import { Icon } from '../../various/Icon';
import { Select } from '../../various/Select';
import { DefaultValues, VALIDATIONS } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep1: React.FC<Props> = ({ control, errors, register }) => {
  return (
    <Grid.Container gap={1}>
      <Grid xs={12} sm={6}>
        <Input
          type="email"
          labelLeft="Email"
          aria-label="Email"
          placeholder="john.doe@domain.com"
          fullWidth
          status={errors.email && 'error'}
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
        />
      </Grid>
    </Grid.Container>
  );
};
