import { Input } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { COUNTRIES } from '../../../constants/countries';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { Select } from '../../various/Select';
import { DefaultValues } from './constants';
import { InputPassword } from '../../various/InputPassword';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep1: React.FC<Props> = ({ control, errors, register }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4">
      <Input
        type="email"
        label="Email"
        placeholder="john.doe@domain.com"
        validationState={errors.email && 'invalid'}
        errorMessage={errors.email?.message}
        {...register('email', VALIDATION_RULES.EMAIL)}
      />
      <InputPassword
        label="Password"
        validationState={errors.password && 'invalid'}
        errorMessage={errors.password?.message}
        {...register('password', VALIDATION_RULES.PASSWORD)}
      />
      <Input
        label="Name"
        placeholder="John Doe"
        validationState={errors.name && 'invalid'}
        errorMessage={errors.name?.message}
        {...register('name', VALIDATION_RULES.SHORT_TEXT)}
      />
      <Select
        label="Country"
        placeholder="Select..."
        validationState={errors.country && 'invalid'}
        options={COUNTRIES}
        name="country"
        control={control}
        rules={VALIDATION_RULES.REQUIRED}
      />
    </div>
  );
};
