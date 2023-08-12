import { Button, Card, Row, Text, User } from '@nextui-org/react';
import cx from 'classnames';
import Link from 'next/link';
import React from 'react';

import { SKILL_EMOJIS } from '../../../constants/skills';
import { useSession } from '../../../hooks/useSession';
import { Common } from '../../../typings/common';
import { Job } from '../../../typings/job';
import { formatRelativeTime } from '../../../utils/dates';
import { JobFeatures } from '../JobFeatures';
import styles from './JobCard.module.scss';

interface Props {
  jobOffer: Omit<Job.Offer, '_id' | 'applications'> & { _id?: Common.Id };
  className?: string;
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hideCreator?: boolean;
  hideApply?: boolean;
}

export const JobCard = (props: Props) => {
  const {
    children,
    className,
    footer = null,
    header = null,
    hideCreator = false,
    jobOffer,
  } = props;

  const {
    _id: jobOfferId,
    availability,
    availabilityDuration,
    creationDate,
    creator,
    hasApplied,
    location,
    paymentType,
    paymentValue,
    shortDescription,
    skills,
    title,
  } = jobOffer;

  const isCompleted = jobOffer.status === 'completed';
  const hasFooter = !!footer;

  const { currentUser } = useSession();
  const isProfessional = currentUser?.role === 'professional';

  const relativeCreationDate = React.useMemo(() => {
    return formatRelativeTime(creationDate);
  }, [creationDate]);

  const skillEmojis = React.useMemo(() => {
    return skills.map((skill) => SKILL_EMOJIS[skill]).join(' ');
  }, [skills]);

  const cardTitle = <Text h4 className={styles.title}>{title} {skillEmojis}</Text>;

  const creatorBlock = !hideCreator && (
    <User
      className={styles.user}
      name={creator.name}
      src={creator.avatarUrl}
      description={creator.youtube.customUrl}
      pointer
      size="lg"
    />
  );

  const card = (
    <Card className={cx(styles.card, className)} isHoverable={!hasFooter} isPressable={!hasFooter}>
      <Card.Body css={{ pt: header ? '$4' : undefined }}>
        {header}
        {!hideCreator && (
          <Row align="center" justify="space-between" className={styles.header}>
            {isCompleted
              ? <Link href={`/profile/${creator._id}`}>{creatorBlock}</Link>
              : creatorBlock}
            {!isCompleted && isProfessional && (
              <Button as="div" className={styles.applyButton} disabled={hasApplied} auto size="sm">
                {hasApplied ? 'Applied' : 'Apply for job'}
              </Button>
            )}
          </Row>
        )}
        <div className={styles.content}>
          {!isCompleted && hasFooter && jobOfferId
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
      {hasFooter && (
        <Card.Footer css={{ pt: 0 }}>
          {footer}
        </Card.Footer>
      )}
    </Card>
  );

  if (jobOfferId && !hasFooter && !isCompleted) {
    return <Link href={`/jobs/${jobOfferId}`}>{card}</Link>;
  }

  return card;
};
