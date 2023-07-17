import { Grid, Input } from '@nextui-org/react';
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
    <Grid.Container gap={1} alignItems="flex-start">
      <Grid xs={12} sm={6}>
        <Select
          labelLeft="Payment type"
          aria-label="Payment type"
          placeholder="Select..."
          fullWidth
          status={errors.paymentType && 'error'}
          options={PAYMENT_TYPE_OPTIONS}
          name="paymentType"
          control={control}
          rules={VALIDATION_RULES.REQUIRED}
        />
      </Grid>
      <Grid xs={12} sm={6}>
        <Input
          type="number"
          min={1}
          aria-label="Budget"
          labelLeft="Budget ($)"
          labelRight={PAYMENT_TYPE_SHORTS[field.value]}
          fullWidth
          status={errors.paymentValue && 'error'}
          helperText={errors.paymentValue?.message}
          helperColor="error"
          {...register('paymentValue', VALIDATION_RULES.NUMBER)}
        />
      </Grid>
      <Grid xs={12}>
        <Select
          labelLeft="Payment preferences"
          labelRight="optional"
          aria-label="Payment type"
          placeholder="Select..."
          fullWidth
          selectionMode="multiple"
          options={PAYMENT_PREFERENCE_OPTIONS}
          name="paymentPreferences"
          control={control}
        />
      </Grid>
    </Grid.Container>
  );
};
