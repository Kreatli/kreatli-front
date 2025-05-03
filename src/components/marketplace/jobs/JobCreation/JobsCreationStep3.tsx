import { Input, Select, SelectItem } from '@heroui/react';
import React from 'react';
import { Control, Controller, FieldErrors, useController, UseFormRegister } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import {
  PAYMENT_PREFERENCE_OPTIONS,
  PAYMENT_TYPE_OPTIONS,
  PAYMENT_TYPE_SHORTS,
} from '../../../../constants/marketplace/payment';
import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
}

export const JobsCreationStep3 = ({ control, errors, register }: Props) => {
  const { field: paymentTypeField } = useController({ control, name: 'paymentType' });
  const { field: paymentPreferencesField } = useController({ control, name: 'paymentPreferences' });

  const handlePaymentPreferencesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    paymentPreferencesField.onChange(event.target.value.split(','));
    paymentPreferencesField.onBlur();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4">
      <Select
        label="Payment type"
        placeholder="Select payment type"
        disallowEmptySelection
        isInvalid={!!errors.paymentType}
        {...register('paymentType', VALIDATION_RULES.REQUIRED)}
      >
        {PAYMENT_TYPE_OPTIONS.map((paymentType) => (
          <SelectItem key={paymentType.value}>{paymentType.label}</SelectItem>
        ))}
      </Select>
      <Select
        label="Payment preferences (optional)"
        placeholder="Select payment preferences"
        selectionMode="multiple"
        isInvalid={!!errors.paymentPreferences}
        onChange={handlePaymentPreferencesChange}
      >
        {PAYMENT_PREFERENCE_OPTIONS.map((paymentPreference) => (
          <SelectItem key={paymentPreference.value}>{paymentPreference.label}</SelectItem>
        ))}
      </Select>
      <Controller
        render={({ field }) => (
          <NumericFormat
            value={field.value || ''}
            onValueChange={({ floatValue }) => field.onChange(floatValue)}
            onBlur={field.onBlur}
            customInput={Input}
            allowNegative={false}
            thousandSeparator
            decimalScale={0}
            prefix="$"
            min={1}
            label="Budget from ($)"
            placeholder="Specify your minimum budget"
            endContent={
              <span className="pointer-events-none whitespace-nowrap text-small text-gray-400">
                {PAYMENT_TYPE_SHORTS[paymentTypeField.value]}
              </span>
            }
            fullWidth
            isInvalid={!!errors.paymentValue}
            errorMessage={errors.paymentValue?.message}
          />
        )}
        name="paymentValue"
        control={control}
        rules={VALIDATION_RULES.NUMBER}
      />
      <Controller
        render={({ field }) => (
          <NumericFormat
            value={field.value || ''}
            onValueChange={({ floatValue }) => field.onChange(floatValue)}
            onBlur={field.onBlur}
            customInput={Input}
            allowNegative={false}
            thousandSeparator
            decimalScale={0}
            prefix="$"
            min={1}
            label="Budget to ($)"
            placeholder="Specify your maximum budget"
            endContent={
              <span className="pointer-events-none whitespace-nowrap text-small text-gray-400">
                {PAYMENT_TYPE_SHORTS[paymentTypeField.value]}
              </span>
            }
            fullWidth
            isInvalid={!!errors.paymentValueTo}
            errorMessage={errors.paymentValueTo?.message}
          />
        )}
        name="paymentValueTo"
        control={control}
        rules={{
          ...VALIDATION_RULES.NUMBER,
          validate: (value, { paymentValue }) =>
            value >= paymentValue || 'Must be greater than or equal to the minimum budget',
        }}
      />
    </div>
  );
};
