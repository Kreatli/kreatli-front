import { Button, Card, Row, Text, User } from '@nextui-org/react';
import cx from 'classnames';
import Link from 'next/link';
import React from 'react';

import { COUNTRY_LABELS } from '../../../constants/countries';
import { DURATION_LABELS } from '../../../constants/duration';
import { PAYMENT_TYPE_SHORTS } from '../../../constants/payment';
import { SKILL_EMOJIS } from '../../../constants/skills';
import { Common } from '../../../typings/common';
import { Job } from '../../../typings/job';
import { formatRelativeTime } from '../../../utils/dates';
import styles from './JobCard.module.scss';
import { JobCardFeature } from './JobCardFeature';

interface Props
  extends Omit<Job.Offer, '_id' | 'hiredApplication' | 'applications'> {
  _id?: Common.Id;
  className?: string;
}

export const JobCard = (props: Props) => {
  const {
    _id: jobOfferId,
    className,
    creationDate,
    creator,
    duration,
    location,
    paymentType,
    paymentValue,
    shortDescription,
    skills,
    title,
  } = props;

  const relativeCreationDate = React.useMemo(() => {
    return formatRelativeTime(creationDate);
  }, [creationDate]);

  const skillEmojis = React.useMemo(() => {
    return skills.map((skill) => SKILL_EMOJIS[skill]).join(' ');
  }, [skills]);

  const paymentValueFormatter = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' });

  const card = (
    <Card className={cx(styles.card, className)} isHoverable isPressable>
      <Card.Body>
        <Row align="center" justify="space-between" className={styles.header}>
          <User
            className={styles.user}
            name={creator.name}
            src={creator.avatarUrl}
            size="lg"
          >
            <User.Link href={creator.youtubeUrl}>{creator.youtube.customUrl}</User.Link>
          </User>
          <Button auto size="sm">Apply for job</Button>
        </Row>
        <div className={styles.content}>
          <Text h4 className={styles.title}>{title} {skillEmojis}</Text>
          <Text className={styles.text}>{shortDescription}</Text>
        </div>
        <div className={styles.footer}>
          <div className={styles.features}>
            <JobCardFeature icon="location" title={COUNTRY_LABELS[location] ?? 'Remote'} />
            <JobCardFeature icon="dollar" title={`${paymentValueFormatter.format(paymentValue)} ${PAYMENT_TYPE_SHORTS[paymentType]}`} />
            <JobCardFeature icon="time" title={DURATION_LABELS[duration]} />
          </div>
          <Text size="$sm" color="$accents6">Posted {relativeCreationDate}</Text>
        </div>
      </Card.Body>
    </Card>
  );

  if (jobOfferId) {
    return <Link href={`/jobs/${jobOfferId}`}>{card}</Link>;
  }

  return card;
};
