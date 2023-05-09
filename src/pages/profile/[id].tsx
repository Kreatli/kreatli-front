import { Avatar, Badge, Container, Grid, Spacer, Text, User } from '@nextui-org/react';
import Head from 'next/head';
import React from 'react';

import { Tag } from '../../components/various/Tag';
import { SKILL_LABELS_FOR_CREATOR, SKILL_LABELS_FOR_PROFESSIONAL, SKILL_LEVEL_LABELS } from '../../constants/skills';
import { useSession } from '../../hooks/useSession';

const Profile: React.FC = () => {
  const { user } = useSession();

  const userInitials = React.useMemo(() => {
    return user?.name?.split(' ').map((part: string) => part[0]).join('') ?? '';
  }, [user]);

  const pageTitle = `Kreatli | ${user?.name ?? ''}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container>
        <Badge
          content={user?.isVerified ? 'verified' : 'unverified'}
          variant={user?.isVerified ? 'flat' : 'bordered'}
          color={user?.isVerified ? 'success' : 'default'}
          size="xs"
        >
          <Avatar
            size="xl"
            text={userInitials}
            textColor="primary"
            src={user?.avatarUrl}
          />
        </Badge>
        <Text h2>{user?.name}</Text>
        <Text css={{ whiteSpace: 'pre' }}>{user?.description}</Text>
        <Spacer y={1} />
        <Text><Text weight="bold" as="span">Role:</Text> {user?.role}</Text>
        <Spacer y={1} />
        {user?.role === 'creator' && (
          <Grid.Container css={{ gap: '0.5rem' }} alignItems="center">
            <Grid>
              <Text>I&apos;m looking for</Text>
            </Grid>
            {user?.interestSkills.map((skill) => (
              <Grid key={skill}>
                <Tag checked disabled>{SKILL_LABELS_FOR_CREATOR[skill]}</Tag>
              </Grid>
            ))}
          </Grid.Container>
        )}
        {user?.role === 'professional' && (
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
        )}
        {user?.role === 'professional' && (
          <>
            <Spacer y={2} />
            <Text h3>Experience</Text>
            <Grid.Container css={{ gap: '1rem' }}>
              {user.experiences.map(({ companyName, imageUrl, companyUrl, description }) => (
                <Grid xs={12}>
                  <User
                    size="xl"
                    squared
                    bordered
                    color="gradient"
                    name={companyName}
                    src={imageUrl}
                  >
                    <User.Link href={companyUrl}>Website</User.Link>
                    <span style={{ display: 'block', whiteSpace: 'initial' }}>{description}</span>
                  </User>
                </Grid>
              ))}
            </Grid.Container>
          </>
        )}
      </Container>
    </>
  );
};

export default Profile;
