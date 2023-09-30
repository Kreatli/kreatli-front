import { Input, Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, useController, UseFormRegister } from 'react-hook-form';

import { PAYMENT_PREFERENCE_OPTIONS, PAYMENT_TYPE_OPTIONS, PAYMENT_TYPE_SHORTS } from '../../../constants/payment';
import { VALIDATION_RULES } from '../../../constants/validationRules';
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
        placeholder="Select payment type"
        validationState={errors.paymentType && 'invalid'}
        {...register('paymentType', VALIDATION_RULES.REQUIRED)}
      >
        {PAYMENT_TYPE_OPTIONS.map((paymentType) => (
          <SelectItem key={paymentType.value} value={paymentType.value}>{paymentType.label}</SelectItem>
        ))}
      </Select>
      <Input
        type="number"
        min={1}
        label="Budget ($)"
        placeholder="Budget ($)"
        endContent={<span className="pointer-events-none whitespace-nowrap text-small text-gray-400">{PAYMENT_TYPE_SHORTS[field.value]}</span>}
        fullWidth
        validationState={errors.paymentValue && 'invalid'}
        errorMessage={errors.paymentValue?.message}
        {...register('paymentValue', VALIDATION_RULES.NUMBER)}
      />
      <div className="col-span-2">
        <Select
          label="Payment preferences (optional)"
          placeholder="Select payment preferences"
          selectionMode="multiple"
          validationState={errors.paymentPreferences && 'invalid'}
          {...register('paymentPreferences', VALIDATION_RULES.REQUIRED)}
        >
          {PAYMENT_PREFERENCE_OPTIONS.map((paymentPreference) => (
            <SelectItem key={paymentPreference.value} value={paymentPreference.value}>
              {paymentPreference.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
