import React from 'react';

import { PAYMENT_PREFERENCES_ICONS, PAYMENT_PREFERENCES_LABELS } from '../../../constants/payment';
import { Payment } from '../../../typings/payment';
import { PaymentMethod } from './PaymentMethod';

interface Props {
  methods: Payment.Preference[];
}

export const PaymentMethods = ({ methods }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 gap-y-1">
      {methods.map((method) => (
        <PaymentMethod key={method} icon={PAYMENT_PREFERENCES_ICONS[method]}>
          {PAYMENT_PREFERENCES_LABELS[method]}
        </PaymentMethod>
      ))}
    </div>
  );
};
