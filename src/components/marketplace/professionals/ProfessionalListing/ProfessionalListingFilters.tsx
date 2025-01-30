import cx from 'classnames';
import { omit, without } from 'ramda';
import React from 'react';

import { COUNTRIES } from '../../../../constants/countries';
import {
  SKILL_DESCRIPTIONS,
  SKILL_EMOJIS,
  SKILL_LABELS,
  SKILL_LEVEL_OPTIONS,
  SKILLS,
} from '../../../../constants/marketplace/skills';
import { TIER_OPTIONS } from '../../../../constants/marketplace/tier';
import { Api } from '../../../../typings/marketplace/api';
import { Skill } from '../../../../typings/marketplace/skill';
import { Menu } from '../../../various/Menu';
import styles from './ProfessionalListing.module.scss';

interface Props {
  isOpen: boolean;
  isMobile: boolean;
  filters: Api.GetParams['/professionals'];
  onClose: () => void;
  onChange: (filters: Api.GetParams['/professionals']) => void;
}

export const ProfessionalListingFilters = ({ filters, isOpen, isMobile, onChange, onClose }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleFilterSelect = (key: any) => (values: string[]) => {
    if (values.length === 0) {
      return onChange(omit([key], filters));
    }

    return onChange({
      ...filters,
      [key]: values,
    });
  };

  const handleSkillClick = (skill: Skill) => () => {
    const normalizedSkills = [filters.skills ?? []].flat();

    onChange({
      ...filters,
      skills: normalizedSkills.includes(skill) ? without([skill], normalizedSkills) : [...normalizedSkills, skill],
    });
  };

  const filterOptions = React.useMemo(() => {
    return [
      {
        key: 'skillLevel',
        icon: 'ranking',
        label: 'Skill level',
        selectionMode: 'single',
        selectedKeys: new Set([filters.skillLevel ?? []].flat()),
        options: SKILL_LEVEL_OPTIONS,
      },
      {
        key: 'tier',
        icon: 'diamond',
        label: 'Tier',
        selectionMode: 'multiple',
        selectedKeys: new Set([filters.tier ?? []].flat()),
        options: TIER_OPTIONS,
      },
      {
        key: 'location',
        icon: 'location',
        label: 'Location',
        selectionMode: 'multiple',
        selectedKeys: new Set([filters.location ?? []].flat()),
        options: COUNTRIES,
      },
    ] as const;
  }, [filters.location, filters.skillLevel, filters.tier]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      {isMobile && isOpen && <div className={styles.filtersBackground} onClick={onClose} />}
      <div ref={ref} className={cx(styles.filters, { [styles.opened]: isOpen })}>
        <div className={styles.filtersInner}>
          <Menu>
            <Menu.Group>
              <Menu.Item
                href="/marketplace/jobs"
                icon="suitcase"
                label="Job postings"
                description="Find YouTube creators to work with"
              />
              <Menu.Item
                href="/marketplace/professionals"
                icon="group"
                label="Professionals"
                description="Look for professionals to connect and work with"
              />
            </Menu.Group>
            <Menu.Group title="Qualifications">
              {Object.values(SKILLS).map((key) => (
                <Menu.Item
                  key={key}
                  isSelected={filters.skills?.includes(key)}
                  label={SKILL_LABELS[key]}
                  emoji={SKILL_EMOJIS[key]}
                  description={SKILL_DESCRIPTIONS[key]}
                  onClick={handleSkillClick(key)}
                />
              ))}
            </Menu.Group>
            <Menu.Group title="Filters">
              {filterOptions.map(({ selectedKeys, key, label, icon, options, selectionMode }) => (
                <Menu.Item
                  key={key}
                  isSelected={Object.keys(filters).includes(key)}
                  label={label}
                  icon={icon}
                  options={options}
                  selectionMode={selectionMode}
                  selectedKeys={selectedKeys}
                  onSelect={handleFilterSelect(key)}
                />
              ))}
            </Menu.Group>
          </Menu>
        </div>
      </div>
    </>
  );
};
