const AVAILABILITY = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  PROJECT_BASED: 'project-base',
};

const DURATION = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  MONTHS_3: 'months-3',
  MONTHS_6: 'months-6',
};

export const AVAILABILITY_LABELS = {
  [AVAILABILITY.FULL_TIME]: 'Full-time',
  [AVAILABILITY.PART_TIME]: 'Part-time',
  [AVAILABILITY.PROJECT_BASED]: 'Project-base',
};

export const DURATION_LABELS = {
  [DURATION.DAY]: 'within a day',
  [DURATION.WEEK]: 'within a week',
  [DURATION.MONTH]: 'within a month',
  [DURATION.MONTHS_3]: 'within 3 months',
  [DURATION.MONTHS_6]: 'more than 6 months',
};

export const AVAILABILITY_OPTIONS = [
  { label: AVAILABILITY_LABELS[AVAILABILITY.FULL_TIME], value: AVAILABILITY.FULL_TIME },
  { label: AVAILABILITY_LABELS[AVAILABILITY.PART_TIME], value: AVAILABILITY.PART_TIME },
  { label: AVAILABILITY_LABELS[AVAILABILITY.PROJECT_BASED], value: AVAILABILITY.PROJECT_BASED },
];

export const DURATION_OPTIONS = [
  { label: DURATION_LABELS[DURATION.DAY], value: DURATION.DAY },
  { label: DURATION_LABELS[DURATION.WEEK], value: DURATION.WEEK },
  { label: DURATION_LABELS[DURATION.MONTH], value: DURATION.MONTH },
  { label: DURATION_LABELS[DURATION.MONTHS_3], value: DURATION.MONTHS_3 },
  { label: DURATION_LABELS[DURATION.MONTHS_6], value: DURATION.MONTHS_6 },
];
