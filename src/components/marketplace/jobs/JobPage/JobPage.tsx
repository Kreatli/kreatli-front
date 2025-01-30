import { Avatar, Button, Tooltip, useDisclosure } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { SKILL_LABELS_FOR_PROFESSIONAL } from '../../../../constants/marketplace/skills';
import { useBreakpointValue } from '../../../../hooks/useBreakpointValue';
import { useSession } from '../../../../hooks/marketplace/useSession';
import { Common } from '../../../../typings/common';
import { Job } from '../../../../typings/marketplace/job';
import { formatRelativeTime } from '../../../../utils/dates';
import { ProfileUnverifiedTooltip } from '../../profile/Profile/ProfileUnverifiedTooltip';
import { BottomBar } from '../../../various/BottomBar';
import { PaymentMethods } from '../../../various/PaymentMethods';
import { Tag } from '../../../various/Tag';
import { TierImage } from '../../../various/TierImage';
import { JobApplicationModal } from '../JobApplicationModal';
import { JobFeatures } from '../JobFeatures';
import { JobOthers } from '../JobOthers';
import styles from './JobPage.module.scss';

interface Props extends Omit<Job.Offer, '_id' | 'applications'> {
  _id?: Common.Id;
}

export const JobPage = (props: Props) => {
  const {
    _id: id,
    additionalInformation,
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
    paymentValueTo,
    shortDescription,
    skills,
    status,
    title,
  } = props;

  const isMobile = useBreakpointValue({ SM: false }, true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentUser } = useSession();
  const isExceededLimits = currentUser?.exceededLimits.jobApplications;
  const isPosted = status === 'posted';
  const isProfessional = currentUser?.role === 'professional';

  const relativeCreationDate = React.useMemo(() => {
    return formatRelativeTime(creationDate);
  }, [creationDate]);

  const userCardContent = (
    <>
      <NextLink href={`/marketplace/profile/${creator._id}`} className="flex sm:flex-col items-center gap-4">
        <Avatar
          src={creator.avatarUrl}
          name={creator.name}
          className="w-14 h-14 sm:w-20 sm:h-20"
          radius="full"
          isBordered
        />
        <div>
          <p className="text-lg font-semibold leading-6">
            {creator.name}
            <TierImage tier={creator.tier} className="w-6 h-6" isInline />
          </p>
          <p className="text-sm text-gray-400">{creator.youtube.customUrl}</p>
        </div>
      </NextLink>
      {!isMobile && <PaymentMethods methods={paymentPreferences} />}
      <div className="flex flex-col items-center gap-1">
        {isProfessional &&
          (!isPosted || hasApplied ? (
            <Button isDisabled color="secondary" onClick={onOpen}>
              {hasApplied ? 'Applied' : 'The job is not active'}
            </Button>
          ) : (
            <ProfileUnverifiedTooltip>
              <Tooltip
                isDisabled={!isExceededLimits}
                content="You've reached your job applications limit. Get to the next tier to increase the limit"
              >
                <div>
                  <Button isDisabled={isExceededLimits || !currentUser.isVerified} color="secondary" onClick={onOpen}>
                    Apply for a job
                  </Button>
                </div>
              </Tooltip>
            </ProfileUnverifiedTooltip>
          ))}
        <p className="text-sm text-gray-400">
          {applicationsCount} application{applicationsCount === 1 ? '' : 's'} so far
        </p>
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
            paymentValueTo={paymentValueTo}
          />
          <div className={styles.tags}>
            {skills.map((skill) => (
              <Tag key={skill} disabled>
                {SKILL_LABELS_FOR_PROFESSIONAL[skill]}
              </Tag>
            ))}
          </div>
          <p className={styles.description}>{description}</p>
          {additionalInformation && (
            <>
              <h2 className="text-lg font-semibold mt-6">Additional information</h2>
              <p className={styles.description}>{additionalInformation}</p>
            </>
          )}
        </div>
        {!isMobile && <div className={styles.userCard}>{userCardContent}</div>}
      </div>
      <JobOthers id={id} creatorName={creator.name} />
      {isMobile && <BottomBar className="flex items-center justify-between gap-4">{userCardContent}</BottomBar>}
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
