import React from 'react';

import { AVAILABILITY_LABELS, DURATION_LABELS } from '../../../constants/availability';
import { COUNTRY_LABELS } from '../../../constants/countries';
import { PAYMENT_TYPE_SHORTS } from '../../../constants/payment';
import { Job } from '../../../typings/job';
import { JobFeature } from './JobFeature';
import styles from './JobFeatures.module.scss';

interface Props extends Pick<Job.Offer, 'location' | 'paymentType' | 'paymentValue' | 'availability' | 'availabilityDuration'> {}

export const JobFeatures = ({ location, availability, availabilityDuration, paymentType, paymentValue }: Props) => {
  const paymentValueFormatter = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' });

  const availabilityTitle = availabilityDuration
    ? `${AVAILABILITY_LABELS[availability]} (${DURATION_LABELS[availabilityDuration]})`
    : AVAILABILITY_LABELS[availability];

  return (
    <div className={styles.features}>
      <JobFeature icon="location" title={COUNTRY_LABELS[location] ?? 'Remote'} />
      <JobFeature icon="dollar" title={`${paymentValueFormatter.format(paymentValue)} ${PAYMENT_TYPE_SHORTS[paymentType]}`} />
      <JobFeature icon="calendar" title={availabilityTitle} />
    </div>
  );
};
