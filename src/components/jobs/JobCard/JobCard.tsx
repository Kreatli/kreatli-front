import { Button, Card, Row, Text, User } from '@nextui-org/react';
import cx from 'classnames';
import Link from 'next/link';
import React from 'react';

import { SKILL_EMOJIS } from '../../../constants/skills';
import { Common } from '../../../typings/common';
import { Job } from '../../../typings/job';
import { formatRelativeTime } from '../../../utils/dates';
import { JobFeatures } from '../JobFeatures';
import styles from './JobCard.module.scss';

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

  const card = (
    <Card className={cx(styles.card, className)} isHoverable isPressable>
      <Card.Body>
        <Row align="center" justify="space-between" className={styles.header}>
          <User
            className={styles.user}
            name={creator.name}
            src={creator.avatarUrl}
            description={creator.youtube.customUrl}
            pointer
            size="lg"
          />
          <Button as="div" className={styles.applyButton} auto size="sm">Apply</Button>
        </Row>
        <div className={styles.content}>
          <Text h4 className={styles.title}>{title} {skillEmojis}</Text>
          <Text className={styles.text}>{shortDescription}</Text>
        </div>
        <div className={styles.footer}>
          <JobFeatures location={location} duration={duration} paymentType={paymentType} paymentValue={paymentValue} />
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
