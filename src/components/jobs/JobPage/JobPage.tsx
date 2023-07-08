import { Avatar, Button, Text } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

import { SKILL_LABELS_FOR_PROFESSIONAL } from '../../../constants/skills';
import { useBreakpointValue } from '../../../hooks/useBreakpointValue';
import { Common } from '../../../typings/common';
import { Job } from '../../../typings/job';
import { formatRelativeTime } from '../../../utils/dates';
import { ProfileBadge } from '../../profile/Profile/ProfileBadge';
import { BottomBar } from '../../various/BottomBar';
import { PaymentMethods } from '../../various/PaymentMethods';
import { Tag } from '../../various/Tag';
import { JobFeatures } from '../JobFeatures';
import styles from './JobPage.module.scss';

interface Props
  extends Omit<Job.Offer, '_id' | 'hiredApplication' | 'applications'> {
  _id?: Common.Id;
}

export const JobPage = (props: Props) => {
  const {
    _id: jobOfferId,
    applicationsCount,
    creationDate,
    creator,
    duration,
    location,
    paymentType,
    paymentValue,
    paymentPreferences,
    description,
    skills,
    title,
  } = props;

  const isMobile = useBreakpointValue({ XS: false }, true);

  const relativeCreationDate = React.useMemo(() => {
    return formatRelativeTime(creationDate);
  }, [creationDate]);

  const userCardContent = (
    <>
      <ProfileBadge isVerified={creator.isVerified} size={isMobile ? 'sm' : 'md'}>
        <Link href={`/profile/${creator._id}`}>
          <Avatar src={creator.avatarUrl} css={{ size: isMobile ? '$18' : '$20' }} squared bordered pointer />
        </Link>
      </ProfileBadge>
      <div>
        <Link href={`/profile/${creator._id}`}>
          <Text size="large" weight="semibold" className={styles.cardTitle}>{creator.name}</Text>
        </Link>
        <Text className={styles.cardLink}><Link href={creator.youtubeUrl} target="_blank">{creator.youtube.customUrl}</Link></Text>
      </div>
      {!isMobile && <PaymentMethods methods={paymentPreferences} />}
      <div className={styles.cardApply}>
        <Button auto className={styles.cardButton}>Apply for job</Button>
        <Text color="$accents6" size="$sm">{applicationsCount} application{applicationsCount === 1 ? '' : 's'} so far</Text>
      </div>
    </>
  );

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Text size="$sm" color="$accents6">Posted {relativeCreationDate}</Text>
          <Text h3>{title}</Text>
          <JobFeatures location={location} duration={duration} paymentType={paymentType} paymentValue={paymentValue} />
          <div className={styles.tags}>
            {skills.map((skill) => (
              <Tag key={skill} disabled>{SKILL_LABELS_FOR_PROFESSIONAL[skill]}</Tag>
            ))}
          </div>
          <Text className={styles.description}>{description}</Text>
        </div>
        {!isMobile && (
          <div className={styles.userCard}>
            {userCardContent}
          </div>
        )}
      </div>
      {isMobile && (
        <BottomBar className={styles.bottomBar}>
          {userCardContent}
        </BottomBar>
      )}
    </>
  );
};
