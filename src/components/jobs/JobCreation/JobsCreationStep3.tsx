import { Input } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, useController, UseFormRegister } from 'react-hook-form';

import { PAYMENT_PREFERENCE_OPTIONS, PAYMENT_TYPE_OPTIONS, PAYMENT_TYPE_SHORTS } from '../../../constants/payment';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { Select } from '../../various/Select';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
}

export const JobsCreationStep3: React.FC<Props> = ({ control, errors, register }) => {
  const { field } = useController({ control, name: 'paymentType' });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4">
      <Select
        label="Payment type"
        placeholder="Select..."
        fullWidth
        validationState={errors.paymentType && 'invalid'}
        options={PAYMENT_TYPE_OPTIONS}
        name="paymentType"
        control={control}
        rules={VALIDATION_RULES.REQUIRED}
      />
      <Input
        type="number"
        min={1}
        label="Budget ($)"
        endContent={<span className="pointer-events-none whitespace-nowrap text-small text-gray-400">{PAYMENT_TYPE_SHORTS[field.value]}</span>}
        fullWidth
        validationState={errors.paymentValue && 'invalid'}
        errorMessage={errors.paymentValue?.message}
        {...register('paymentValue', VALIDATION_RULES.NUMBER)}
      />
      <div className="col-span-2">
        <Select
          endContent={<span className="pointer-events-none text-small text-gray-400">optional</span>}
          label="Payment preferences"
          placeholder="Select..."
          fullWidth
          selectionMode="multiple"
          options={PAYMENT_PREFERENCE_OPTIONS}
          name="paymentPreferences"
          control={control}
        />
      </div>
    </div>
  );
};
