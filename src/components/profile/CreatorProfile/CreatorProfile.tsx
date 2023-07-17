import { Container, Grid, Spacer, Text, useTheme } from '@nextui-org/react';
import NextLink from 'next/link';
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

interface Props {
  userId: Common.Id;
}

export const CreatorProfile = ({ userId }: Props) => {
  const { theme } = useTheme();
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
    <Container sm>
      {user && (
        <ProfileHeader user={user} />
      )}
      <Spacer y={1} />
      <Grid.Container css={{ gap: '$10' }}>
        <Grid xs style={{ display: 'block' }}>
          <Text>{user?.description}</Text>
          <Spacer y={1} />
          <Grid.Container css={{ gap: '0.5rem' }} alignItems="center">
            <Grid>
              <Text>{user?.name} is looking for</Text>
            </Grid>
            {user?.interestSkills.map((skill) => (
              <Grid key={skill}>
                <Tag disabled>{SKILL_LABELS_FOR_CREATOR[skill]}</Tag>
              </Grid>
            ))}
          </Grid.Container>
        </Grid>
        <Grid>
          <Grid.Container direction="column" css={{ gap: '$2' }}>
            {socials.map(({ href, icon }) => (
              <Grid key={href}>
                <NextLink href={href} target="_blank">
                  <Icon icon={icon} size={30} fill={theme?.colors.accents8.value} />
                </NextLink>
              </Grid>
            ))}
          </Grid.Container>
        </Grid>
      </Grid.Container>
      <Spacer y={2} />
      <Text h3>Channel details</Text>
      {user && (
        <ChannelDetails id={user._id} youtubeUrl={user.youtubeUrl} details={user.youtube} />
      )}
      <Spacer y={2} />
      {user && (
        <RecentConnections ids={user.connections} />
      )}
    </Container>
  );
};
