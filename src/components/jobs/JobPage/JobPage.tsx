import { Avatar, Button, useDisclosure } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { SKILL_LABELS_FOR_PROFESSIONAL } from '../../../constants/skills';
import { useBreakpointValue } from '../../../hooks/useBreakpointValue';
import { useSession } from '../../../hooks/useSession';
import { Common } from '../../../typings/common';
import { Job } from '../../../typings/job';
import { formatRelativeTime } from '../../../utils/dates';
import { ProfileBadge } from '../../profile/Profile/ProfileBadge';
import { BottomBar } from '../../various/BottomBar';
import { PaymentMethods } from '../../various/PaymentMethods';
import { Tag } from '../../various/Tag';
import { JobApplicationModal } from '../JobApplicationModal';
import { JobFeatures } from '../JobFeatures';
import { JobOthers } from '../JobOthers';
import styles from './JobPage.module.scss';

interface Props
  extends Omit<Job.Offer, '_id' | 'applications'> {
  _id?: Common.Id;
}

export const JobPage = (props: Props) => {
  const {
    _id: id,
    applicationsCount,
    availability,
    availabilityDuration,
    creationDate,
    creator,
    description,
    hasApplied,
    location,
    paymentPreferences,
    paymentType,
    paymentValue,
    shortDescription,
    skills,
    status,
    title,
  } = props;

  const isMobile = useBreakpointValue({ SM: false }, true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useSession();
  const isPosted = status === 'posted';
  const isProfessional = currentUser?.role === 'professional';

  const relativeCreationDate = React.useMemo(() => {
    return formatRelativeTime(creationDate);
  }, [creationDate]);

  const userCardContent = (
    <>
      <NextLink href={`/profile/${creator._id}`} className="flex sm:flex-col items-center gap-4">
        <ProfileBadge isVerified={creator.isVerified} shape="circle">
          <Avatar src={creator.avatarUrl} className="w-14 h-14 sm:w-20 sm:h-20" radius="full" isBordered />
        </ProfileBadge>
        <div>
          <p className="text-lg font-semibold leading-6">{creator.name}</p>
          <p className="text-sm text-gray-400">{creator.youtube.customUrl}</p>
        </div>
      </NextLink>
      {!isMobile && <PaymentMethods methods={paymentPreferences} />}
      <div className="flex flex-col items-center gap-1">
        {isProfessional && (
          <Button isDisabled={hasApplied || !isPosted} color="secondary" onClick={onOpen}>
            {hasApplied
              ? 'Applied'
              : isPosted
                ? 'Apply for job'
                : 'The job is not active'}
          </Button>
        )}
        <p className="text-sm text-gray-400">{applicationsCount} application{applicationsCount === 1 ? '' : 's'} so far</p>
      </div>
    </>
  );

  return (
    <>
      <div className={styles.wrapper}>
        <div className="flex-1">
          <p className="text-sm text-gray-400">Posted {relativeCreationDate}</p>
          <h3 className="text-2xl font-semibold mb-2">{title}</h3>
          <JobFeatures
            location={location}
            availability={availability}
            availabilityDuration={availabilityDuration}
            paymentType={paymentType}
            paymentValue={paymentValue}
          />
          <div className={styles.tags}>
            {skills.map((skill) => (
              <Tag key={skill} disabled>{SKILL_LABELS_FOR_PROFESSIONAL[skill]}</Tag>
            ))}
          </div>
          <p className={styles.description}>{description}</p>
        </div>
        {!isMobile && (
          <div className={styles.userCard}>
            {userCardContent}
          </div>
        )}
      </div>
      <JobOthers id={id} creatorName={creator.name} />
      {isMobile && (
        <BottomBar className="flex items-center justify-between gap-4">
          {userCardContent}
        </BottomBar>
      )}
      {id && (
        <JobApplicationModal
          isOpen={isOpen}
          jobOfferId={id}
          title={title}
          shortDescription={shortDescription}
          onClose={onClose}
        />
      )}
    </>
  );
};
