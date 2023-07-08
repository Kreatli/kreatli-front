import React from 'react';

import { COUNTRY_LABELS } from '../../../constants/countries';
import { DURATION_LABELS } from '../../../constants/duration';
import { PAYMENT_TYPE_SHORTS } from '../../../constants/payment';
import { Job } from '../../../typings/job';
import { JobFeature } from './JobFeature';
import styles from './JobFeatures.module.scss';

interface Props extends Pick<Job.Offer, 'location' | 'paymentType' | 'paymentValue' | 'duration'> {}

export const JobFeatures = ({ location, duration, paymentType, paymentValue }: Props) => {
  const paymentValueFormatter = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' });

  return (
    <div className={styles.features}>
      <JobFeature icon="location" title={COUNTRY_LABELS[location] ?? 'Remote'} />
      <JobFeature icon="dollar" title={`${paymentValueFormatter.format(paymentValue)} ${PAYMENT_TYPE_SHORTS[paymentType]}`} />
      <JobFeature icon="time" title={DURATION_LABELS[duration]} />
    </div>
  );
};
