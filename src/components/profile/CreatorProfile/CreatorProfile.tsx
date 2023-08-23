import { Link } from '@nextui-org/react';
import React from 'react';

import { SKILL_LABELS_FOR_CREATOR } from '../../../constants/skills';
import { useUser } from '../../../hooks/useUser';
import { Common } from '../../../typings/common';
import { User } from '../../../typings/user';
import { Icon, IconType } from '../../various/Icon';
import { Tag } from '../../various/Tag';
import { ProfileHeader } from '../Profile/ProfileHeader';
import { RecentConnections } from '../RecentConnections';
import { ChannelDetails } from './ChannelDetails';
import { RecentJobs } from './RecentJobs';

interface Props {
  userId: Common.Id;
}

export const CreatorProfile = ({ userId }: Props) => {
  const { user } = useUser<User.Creator>(userId);

  const socials = React.useMemo(() => {
    if (!user) return [];

    return [
      { href: user.youtubeUrl, icon: 'youtube' },
      ...(user.twitterUrl ? [{ href: user.twitterUrl, icon: 'twitter' }] : []),
      ...(user.discordUsername ? [{ href: 'https://discord.com', icon: 'discord' }] : []),
    ] as { href: string; icon: IconType }[];
  }, [user]);

  return (
    <div className="container max-w-screen-lg mx-auto px-6">
      {user && (
        <ProfileHeader user={user} />
      )}
      <div className="flex gap-10 mt-4">
        <div className="flex-initial">
          <p className="mb-4">{user?.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            <div>
              <p>{user?.name} is looking for</p>
            </div>
            {user?.interestSkills.map((skill) => (
              <div key={skill}>
                <Tag disabled>{SKILL_LABELS_FOR_CREATOR[skill]}</Tag>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {socials.map(({ href, icon }) => (
            <Link href={href} target="_blank" color="foreground">
              <Icon icon={icon} size="2rem" />
            </Link>
          ))}
        </div>
      </div>
      <h3 className="text-2xl font-semibold mt-8 mb-2">Channel details</h3>
      {user && (
        <>
          <ChannelDetails id={user._id} youtubeUrl={user.youtubeUrl} details={user.youtube} />
          <RecentJobs id={userId} />
          <RecentConnections ids={user.connections} />
        </>
      )}
    </div>
  );
};
