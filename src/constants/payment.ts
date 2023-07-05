const PAYMENT_TYPES = {
  HOURLY: 'per-hour',
  PER_PROJECT: 'per-project',
  PER_MONTH: 'per-month',
  PER_YEAR: 'per-year',
};

export const PAYMENT_TYPE_OPTIONS = [
  { label: 'Project', value: PAYMENT_TYPES.PER_PROJECT },
  { label: 'Hourly', value: PAYMENT_TYPES.HOURLY },
  { label: 'Monthly', value: PAYMENT_TYPES.PER_MONTH },
  { label: 'Yearly', value: PAYMENT_TYPES.PER_YEAR },
];

export const PAYMENT_TYPE_SHORTS = {
  [PAYMENT_TYPES.PER_PROJECT]: 'per project',
  [PAYMENT_TYPES.HOURLY]: 'per hour',
  [PAYMENT_TYPES.PER_MONTH]: 'per month',
  [PAYMENT_TYPES.PER_YEAR]: 'per year',
};

const PAYMENT_PREFERENCES = {
  CASH: 'cash',
  CREDIT_CARD: 'credit-card',
  BANK_TRANSFER: 'bank-transfer',
  PAYPAL: 'paypal',
  CRYPTO: 'crypto',
};

export const PAYMENT_PREFERENCE_OPTIONS = [
  { label: 'Cash', value: PAYMENT_PREFERENCES.CASH },
  { label: 'Credit Card', value: PAYMENT_PREFERENCES.CREDIT_CARD },
  { label: 'Bank Transfer', value: PAYMENT_PREFERENCES.BANK_TRANSFER },
  { label: 'PayPal', value: PAYMENT_PREFERENCES.PAYPAL },
  { label: 'Crypto', value: PAYMENT_PREFERENCES.CRYPTO },
];
