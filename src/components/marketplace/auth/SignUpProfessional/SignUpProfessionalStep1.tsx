import { Input, Select, SelectItem } from '@heroui/react';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { COUNTRIES } from '../../../../constants/countries';
import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { InputPassword } from '../../../various/InputPassword';
import { DefaultValues } from './constants';

interface Props {
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep1 = ({ errors, register }: Props) => {
  const { t } = useTranslation(['common']);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4">
      <Input
        type="email"
        label={t('common:email')}
        placeholder="john.doe@domain.com"
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        {...register('email', VALIDATION_RULES.EMAIL)}
      />
      <InputPassword
        label="Password"
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        {...register('password', VALIDATION_RULES.PASSWORD)}
      />
      <Input
        label="Name"
        placeholder="John Doe"
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        {...register('name', VALIDATION_RULES.SHORT_TEXT)}
      />
      <Select
        label="Country"
        placeholder="Select country"
        disallowEmptySelection
        isInvalid={!!errors.country}
        {...register('country', VALIDATION_RULES.REQUIRED)}
      >
        {COUNTRIES.map((country) => (
          <SelectItem key={country.value}>{country.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
};
