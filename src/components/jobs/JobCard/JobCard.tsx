import { Badge, Button, Card, Row, Text, User } from '@nextui-org/react';
import cx from 'classnames';
import Link from 'next/link';
import React from 'react';

import { JOB_APPLICATION_STATUS_COLORS, JOB_APPLICATION_STATUS_LABELS, JOB_OFFER_STATUS_COLORS, JOB_OFFER_STATUS_LABELS } from '../../../constants/job';
import { SKILL_EMOJIS } from '../../../constants/skills';
import { useSession } from '../../../hooks/useSession';
import { Common } from '../../../typings/common';
import { Job } from '../../../typings/job';
import { formatRelativeTime } from '../../../utils/dates';
import { JobFeatures } from '../JobFeatures';
import styles from './JobCard.module.scss';

interface Props
  extends Omit<Job.Offer, '_id' | 'applications'> {
  _id?: Common.Id;
  className?: string;
  children?: React.ReactNode;
  jobApplicationStatus?: Job.Application['status'];
}

export const JobCard = (props: Props) => {
  const {
    _id: jobOfferId,
    availability,
    availabilityDuration,
    children,
    className,
    creationDate,
    creator,
    hasApplied,
    jobApplicationStatus,
    location,
    paymentType,
    paymentValue,
    shortDescription,
    skills,
    status,
    title,
  } = props;

  const hasChildren = !!children;

  const { currentUser } = useSession();
  const isProfessional = currentUser?.role === 'professional';

  const relativeCreationDate = React.useMemo(() => {
    return formatRelativeTime(creationDate);
  }, [creationDate]);

  const skillEmojis = React.useMemo(() => {
    return skills.map((skill) => SKILL_EMOJIS[skill]).join(' ');
  }, [skills]);

  const cardTitle = <Text h4 className={styles.title}>{title} {skillEmojis}</Text>;

  const card = (
    <Card className={cx(styles.card, className)} isHoverable={!hasChildren} isPressable={!hasChildren}>
      <Card.Body>
        {hasChildren && (
          jobApplicationStatus
            ? <Badge variant="flat" isSquared color={JOB_APPLICATION_STATUS_COLORS[jobApplicationStatus]}>{JOB_APPLICATION_STATUS_LABELS[jobApplicationStatus]}</Badge>
            : <Badge variant="flat" isSquared color={JOB_OFFER_STATUS_COLORS[status]}>{JOB_OFFER_STATUS_LABELS[status]}</Badge>
        )}
        {!hasChildren && (
          <Row align="center" justify="space-between" className={styles.header}>
            <User
              className={styles.user}
              name={creator.name}
              src={creator.avatarUrl}
              description={creator.youtube.customUrl}
              pointer
              size="lg"
            />
            {isProfessional && (
              <Button as="div" className={styles.applyButton} disabled={hasApplied} auto size="sm">
                {hasApplied ? 'Applied' : 'Apply for job'}
              </Button>
            )}
          </Row>
        )}
        <div className={styles.content}>
          {hasChildren && jobOfferId
            ? <Link href={`/jobs/${jobOfferId}`}>{cardTitle}</Link>
            : cardTitle}
          <Text className={styles.text}>{shortDescription}</Text>
        </div>
        <div className={styles.footer}>
          <JobFeatures
            location={location}
            availability={availability}
            availabilityDuration={availabilityDuration}
            paymentType={paymentType}
            paymentValue={paymentValue}
          />
          <Text size="$sm" color="$accents6">Posted {relativeCreationDate}</Text>
        </div>
      </Card.Body>
      {hasChildren && (
        <Card.Footer css={{ pt: 0 }}>
          {children}
        </Card.Footer>
      )}
    </Card>
  );

  if (jobOfferId && !hasChildren) {
    return <Link href={`/jobs/${jobOfferId}`}>{card}</Link>;
  }

  return card;
};
