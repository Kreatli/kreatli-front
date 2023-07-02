import { Container } from '@nextui-org/react';
import Head from 'next/head';
import { omit, without } from 'ramda';
import React from 'react';

import { Menu } from '../components/various/Menu';
import { COUNTRIES } from '../constants/countries';
import { SKILL_DESCRIPTIONS, SKILL_EMOJIS, SKILL_LABELS, SKILL_LEVEL_OPTIONS, SKILLS } from '../constants/skills';
import { TIER_OPTIONS } from '../constants/tier';
import { Skill } from '../typings/skill';

const Jobs = () => {
  const [selectedSkills, setSelectedSkills] = React.useState<Skill[]>([]);
  const [selectedFilters, setSelectedFilters] = React.useState<Record<string, string[]>>({});

  const handleSkillClick = (key: Skill) => () => {
    setSelectedSkills((skills) => (
      skills.includes(key)
        ? without([key], skills)
        : [...skills, key]
    ));
  };

  const handleFilterSelect = (key: string) => (values: string[]) => {
    if (values.length === 0) {
      setSelectedFilters((filters) => omit([key], filters));

      return;
    }

    setSelectedFilters((filters) => ({
      ...filters,
      [key]: values,
    }));
  };

  const filterOptions = [
    {
      key: 'skillLevel',
      icon: 'ranking',
      label: 'Skill level',
      selectionMode: 'single',
      options: SKILL_LEVEL_OPTIONS,
    },
    {
      key: 'tier',
      icon: 'diamond',
      label: 'Tier',
      selectionMode: 'multiple',
      options: TIER_OPTIONS,
    },
    {
      key: 'location',
      icon: 'location',
      label: 'Location',
      selectionMode: 'multiple',
      options: COUNTRIES,
    },
  ] as const;

  return (
    <>
      <Head>
        <title>Job offers | Kreatli</title>
        <meta name="description" content="Kreatli" />
      </Head>
      <Container lg>
        <Menu>
          <Menu.Group>
            <Menu.Item href="/jobs" icon="suitcase" label="Job offers" description="Find YouTube creators to work with" />
            <Menu.Item href="/professionals" icon="group" label="Professionals" description="Look for professionals to connect and work with" />
          </Menu.Group>
          <Menu.Group title="Qualifications">
            {Object.values(SKILLS).map((key) => (
              <Menu.Item
                key={key}
                isSelected={selectedSkills.includes(key)}
                label={SKILL_LABELS[key]}
                emoji={SKILL_EMOJIS[key]}
                description={SKILL_DESCRIPTIONS[key]}
                onClick={handleSkillClick(key)}
              />
            ))}
          </Menu.Group>
          <Menu.Group title="Filters">
            {filterOptions.map(({ key, label, icon, options, selectionMode }) => (
              <Menu.Item
                key={key}
                isSelected={Object.keys(selectedFilters).includes(key)}
                label={label}
                icon={icon}
                options={options}
                selectionMode={selectionMode}
                onSelect={handleFilterSelect(key)}
              />
            ))}
          </Menu.Group>
        </Menu>
        {/* <Text h2>Find professionals</Text>
        <Grid.Container>
          {data?.map((user) => (
            <Grid key={user._id} xs={4} sm={3} md={2}>
              <Link href={`/profile/${user._id}`}>
                <Card isHoverable>
                  <Card.Image src={user.avatarUrl} />
                  <Card.Footer>
                    {user.name}
                  </Card.Footer>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid.Container> */}
      </Container>
    </>
  );
};

export default Jobs;
