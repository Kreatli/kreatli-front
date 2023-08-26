import { Button, Card, CardBody, CardFooter, Divider, Link, User } from '@nextui-org/react';
import NextLink from 'next/link';
import cx from 'classnames';
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
  header?: React.ReactNode;
  footer?: React.ReactNode;
  hideCreator?: boolean;
  hideApply?: boolean;
}

export const JobCard = (props: Props) => {
  const {
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

  const cardTitle = <h4 className="text-xl font-semibold">{title} {skillEmojis}</h4>;

  const creatorBlock = !hideCreator && (
    <User
      name={creator.name}
      classNames={{ name: 'font-medium' }}
      avatarProps={{ src: creator.avatarUrl }}
      description={creator.youtube.customUrl}
    />
  );

  // TODO: on press instead of link ? to leave isPressable effect
  const card = (
    <Card className={cx(styles.card, className)} isHoverable={!hasFooter}>
      <CardBody>
        {header}
        {!hideCreator && (
          <div className={`${styles.header} flex items-center justify-between`}>
            {isCompleted
              ? <NextLink href={`/profile/${creator._id}`}>{creatorBlock}</NextLink>
              : creatorBlock}
            {!isCompleted && isProfessional && (
              <Button as="div" className={styles.applyButton} color="secondary" isDisabled={hasApplied} size="sm">
                {hasApplied ? 'Applied' : 'Apply for job'}
              </Button>
            )}
          </div>
        )}
        <div className={styles.content}>
          {hasFooter && jobOfferId
            ? <Link as={NextLink} href={`/jobs/${jobOfferId}`} color="foreground" underline="hover">{cardTitle}</Link>
            : cardTitle}
          <p className="mb-4">{shortDescription}</p>
        </div>
        <div className={styles.footer}>
          <JobFeatures
            location={location}
            availability={availability}
            availabilityDuration={availabilityDuration}
            paymentType={paymentType}
            paymentValue={paymentValue}
          />
          <p className="text-sm text-gray-400">Posted {relativeCreationDate}</p>
        </div>
      </CardBody>
      {hasFooter && (
        <>
          <Divider />
          <CardFooter>
            {footer}
          </CardFooter>
        </>
      )}
    </Card>
  );

  if (jobOfferId && !hasFooter && !isCompleted) {
    return <NextLink href={`/jobs/${jobOfferId}`}>{card}</NextLink>;
  }

  return card;
};
