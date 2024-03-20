import { Link } from '@nextui-org/react';
import React from 'react';

import { SKILL_LABELS_FOR_CREATOR } from '../../../constants/skills';
import { useUser } from '../../../hooks/useUser';
import { Common } from '../../../typings/common';
import { User } from '../../../typings/user';
import { Icon } from '../../various/Icon';
import { Tag } from '../../various/Tag';
import { ProfileDiscordButton } from '../Profile/ProfileDiscordButton';
import { ProfileHeader } from '../Profile/ProfileHeader';
import { RecentConnections } from '../RecentConnections';
import { ChannelDetails } from './ChannelDetails';
import { PostedJobs } from './PostedJobs';

interface Props {
  userId: Common.Id;
}

export const CreatorProfile = ({ userId }: Props) => {
  const { user } = useUser<User.Creator>(userId);

  return (
    <div className="container max-w-screen-lg mx-auto px-6">
      {user && (
        <ProfileHeader user={user} />
      )}
      <div className="flex gap-10 mt-4">
        <div className="flex-1">
          <p>{user?.description}</p>
          {(user?.interestSkills.length ?? 0) > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <div>
                <p>{user?.name} is looking for</p>
              </div>
              {user?.interestSkills.map((skill) => (
                <div key={skill}>
                  <Tag disabled>{SKILL_LABELS_FOR_CREATOR[skill]}</Tag>
                </div>
              ))}
            </div>
          )}
        </div>
        {user && (
          <div className="flex flex-col gap-2">
            <Link href={user.youtubeUrl} color="foreground" target="_blank">
              <Icon icon="youtube" size="2rem" />
            </Link>
            {user.discordUsername && (
              <ProfileDiscordButton discordUsername={user.discordUsername} />
            )}
            {user.twitterUrl && (
              <Link href={user.twitterUrl} color="foreground" target="_blank">
                <Icon icon="twitter" size="2rem" />
              </Link>
            )}
          </div>
        )}
      </div>
      <h3 className="text-2xl font-semibold mt-8 mb-2">Channel details</h3>
      {user && (
        <>
          <ChannelDetails id={user._id} youtubeUrl={user.youtubeUrl} details={user.youtube} />
          <PostedJobs id={userId} />
          <RecentConnections ids={user.connections} />
        </>
      )}
    </div>
  );
};
