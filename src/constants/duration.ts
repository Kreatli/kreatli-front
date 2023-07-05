const DURATION = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  MONTHS_3: 'months-3',
  MONTHS_6: 'months-6',
};

export const DURATION_LABELS = {
  [DURATION.DAY]: 'within a day',
  [DURATION.WEEK]: 'within a week',
  [DURATION.MONTH]: 'within a month',
  [DURATION.MONTHS_3]: 'within 3 months',
  [DURATION.MONTHS_6]: 'more than 6 months',
};

export const DURATION_OPTIONS = [
  { label: DURATION_LABELS[DURATION.DAY], value: DURATION.DAY },
  { label: DURATION_LABELS[DURATION.DAY], value: DURATION.WEEK },
  { label: DURATION_LABELS[DURATION.DAY], value: DURATION.MONTH },
  { label: DURATION_LABELS[DURATION.DAY], value: DURATION.MONTHS_3 },
  { label: DURATION_LABELS[DURATION.DAY], value: DURATION.MONTHS_6 },
];
