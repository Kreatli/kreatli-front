import { Badge, Link, Skeleton } from '@nextui-org/react';
import React from 'react';

import { SKILL_LABELS_FOR_PROFESSIONAL, SKILL_LEVEL_LABELS } from '../../../../constants/marketplace/skills';
import { useUser } from '../../../../hooks/marketplace/useUser';
import { Common } from '../../../../typings/common';
import { User } from '../../../../typings/marketplace/user';
import { Icon } from '../../../various/Icon';
import { Tag } from '../../../various/Tag';
import { ProfileDiscordButton } from '../Profile/ProfileDiscordButton';
import { ProfileHeader } from '../Profile/ProfileHeader';
import { ProfileHeaderSkeleton } from '../Profile/ProfileHeaderSkeleton';
import { RecentConnections } from '../RecentConnections';
import { ExperienceCard } from './ExperienceCard';
import { RecentJobs } from './RecentJobs';

interface Props {
  userId: Common.Id;
}

export const ProfessionalProfile = ({ userId }: Props) => {
  const { user } = useUser<User.Professional>(userId);

  return (
    <div className="container max-w-screen-lg mx-auto px-6">
      {user ? <ProfileHeader user={user} /> : <ProfileHeaderSkeleton />}
      <div className="flex gap-10 mt-4">
        <div className="flex-1">
          {user ? (
            <>
              <p className="mb-4 whitespace-pre-line">{user?.description.trim()}</p>
              <div className="flex flex-wrap items-center gap-2">
                <p>Skills</p>
                {user?.skills.map((skill) => (
                  <Badge
                    key={skill}
                    size="sm"
                    color="secondary"
                    content={SKILL_LEVEL_LABELS[user?.skillLevels[skill] ?? 'intermediate']}
                  >
                    <Tag disabled>{SKILL_LABELS_FOR_PROFESSIONAL[skill]}</Tag>
                  </Badge>
                ))}
              </div>
            </>
          ) : (
            <Skeleton className="rounded-xl w-full h-24" />
          )}
        </div>
        {user && (
          <div className="flex flex-col gap-2">
            {user.instagramUsername && (
              <Link href={`https://instagram.com/${user.instagramUsername}`} color="foreground" target="_blank">
                <Icon icon="instagram" size="2rem" />
              </Link>
            )}
            {user.discordUsername && <ProfileDiscordButton discordUsername={user.discordUsername} />}
            {user.twitterUrl && (
              <Link href={user.twitterUrl} color="foreground" target="_blank">
                <Icon icon="twitter" size="2rem" />
              </Link>
            )}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-semibold mt-8 mb-2">
        {user ? 'Experience' : <Skeleton className="rounded-xl w-48 h-8" />}
      </h3>
      <div className="flex flex-col gap-4">
        {!user && <Skeleton className="rounded-xl w-full h-36" />}
        {user?.experiences.map((experience) => (
          <ExperienceCard
            key={experience._id}
            imageUrl={experience.imageUrl}
            description={experience.description}
            companyName={experience.companyName}
            companyUrl={experience.companyUrl}
          />
        ))}
      </div>
      <RecentJobs id={userId} />
      {user && <RecentConnections ids={user.connections} />}
    </div>
  );
};
