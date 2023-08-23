export const JOB_OFFER_STATUSES = {
  POSTED: 'posted',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCALED: 'canceled',
};

export const JOB_APPLICATION_STATUSES = {
  PENDING: 'pending',
  HIRED: 'hired',
  REJECTED: 'rejected',
  CANCELED: 'canceled',
};

export const JOB_OFFER_STATUS_LABELS = {
  [JOB_OFFER_STATUSES.POSTED]: 'Posted',
  [JOB_OFFER_STATUSES.ONGOING]: 'Ongoing',
  [JOB_OFFER_STATUSES.COMPLETED]: 'Completed',
  [JOB_OFFER_STATUSES.CANCALED]: 'Canceled',
} as const;

export const JOB_OFFER_STATUS_COLORS = {
  [JOB_OFFER_STATUSES.POSTED]: 'secondary',
  [JOB_OFFER_STATUSES.ONGOING]: 'primary',
  [JOB_OFFER_STATUSES.COMPLETED]: 'success',
  [JOB_OFFER_STATUSES.CANCALED]: 'default',
} as const;

export const JOB_APPLICATION_STATUS_LABELS = {
  [JOB_APPLICATION_STATUSES.PENDING]: 'Pending',
  [JOB_APPLICATION_STATUSES.HIRED]: 'Hired',
  [JOB_APPLICATION_STATUSES.REJECTED]: 'Rejected',
  [JOB_APPLICATION_STATUSES.CANCELED]: 'Canceled',
} as const;

export const JOB_APPLICATION_STATUS_COLORS = {
  [JOB_APPLICATION_STATUSES.PENDING]: 'warning',
  [JOB_APPLICATION_STATUSES.HIRED]: 'success',
  [JOB_APPLICATION_STATUSES.REJECTED]: 'danger',
  [JOB_APPLICATION_STATUSES.CANCELED]: 'default',
} as const;
