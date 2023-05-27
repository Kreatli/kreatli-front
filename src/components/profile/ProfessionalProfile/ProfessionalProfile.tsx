import { Badge, Container, Grid, Spacer, Text, useTheme } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';

import { SKILL_LABELS_FOR_PROFESSIONAL, SKILL_LEVEL_LABELS } from '../../../constants/skills';
import { useUser } from '../../../hooks/useUser';
import { Common } from '../../../typings/common';
import { User } from '../../../typings/user';
import { Icon, IconType } from '../../various/Icon';
import { Tag } from '../../various/Tag';
import { ProfileHeader } from '../Profile/ProfileHeader';

interface Props {
  userId: Common.Id;
}

export const ProfessionalProfile = ({ userId }: Props) => {
  const { theme } = useTheme();
  const { user } = useUser<User.Professional>(userId);

  const socials = React.useMemo(() => {
    if (!user) return [];

    return [
      ...(user.instagramUsername ? [{ href: `https://instagram.com/${user.instagramUsername}`, icon: 'instagram' }] : []),
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
              <Text>I&apos;m good at</Text>
            </Grid>
            {user?.skills.map((skill) => (
              <Grid key={skill}>
                <Badge size="xs" color="primary" content={SKILL_LEVEL_LABELS[user?.skillLevels[skill] ?? 'intermediate']}>
                  <Tag disabled>{SKILL_LABELS_FOR_PROFESSIONAL[skill]}</Tag>
                </Badge>
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
      <Text h3>Resent connections</Text>
    </Container>
  );
};
