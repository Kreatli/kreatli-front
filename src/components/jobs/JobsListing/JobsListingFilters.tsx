import cx from 'classnames';
import { omit, without } from 'ramda';
import React from 'react';

import { AVAILABILITY_OPTIONS, DURATION_OPTIONS } from '../../../constants/availability';
import { LOCATION_OPTIONS } from '../../../constants/location';
import { SKILL_DESCRIPTIONS, SKILL_EMOJIS, SKILL_LABELS, SKILLS } from '../../../constants/skills';
import { Api } from '../../../typings/api';
import { Menu } from '../../various/Menu';
import styles from './JobsListing.module.scss';

interface Props {
  isOpen: boolean;
  isMobile: boolean;
  filters: Api.GetParams['/job-offers'];
  onClose: () => void;
  onChange: (filters: Api.GetParams['/job-offers']) => void;
}

export const JobsListingFilters = ({ filters, isOpen, isMobile, onChange, onClose }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleFilterSelect = (key: any) => (values?: string | string[] | React.MouseEvent<HTMLElement>) => {
    if (Array.isArray(values)) {
      if (key === 'availability' && !values.includes('project-base')) {
        if (values.length === 0) {
          return onChange(omit([key, 'availabilityDuration'], filters));
        }

        return onChange(omit(['availabilityDuration'], { ...filters, [key]: values }));
      }

      if (values.length === 0) {
        return onChange(omit([key], filters));
      }

      return onChange({
        ...filters,
        [key]: values,
      });
    }

    return onChange({
      ...filters,
      skills: filters.skills?.includes(key)
        ? without([key], filters.skills)
        : [...filters.skills ?? [], key],
    });
  };

  const filterOptions = [
    {
      key: 'location',
      icon: 'location',
      label: 'Location',
      selectionMode: 'multiple',
      options: LOCATION_OPTIONS,
    },
    {
      key: 'availability',
      icon: 'calendar',
      label: 'Availability',
      selectionMode: 'single',
      options: AVAILABILITY_OPTIONS,
    },
    ...(filters.availability?.includes('project-base') ? [{
      key: 'availabilityDuration',
      icon: 'time',
      label: 'Duration',
      selectionMode: 'multiple',
      options: DURATION_OPTIONS,
    }] as const : []),
  ] as const;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      {isMobile && isOpen && <div className={styles.filtersBackground} onClick={onClose} />}
      <div ref={ref} className={cx(styles.filters, { [styles.opened]: isOpen })}>
        <div className={styles.filtersInner}>
          <Menu>
            <Menu.Group>
              <Menu.Item href="/jobs" icon="suitcase" label="Job offers" description="Find YouTube creators to work with" />
              <Menu.Item href="/professionals" icon="group" label="Professionals" description="Look for professionals to connect and work with" />
            </Menu.Group>
            <Menu.Group title="Qualifications">
              {Object.values(SKILLS).map((key) => (
                <Menu.Item
                  key={key}
                  isSelected={filters.skills?.includes(key)}
                  label={SKILL_LABELS[key]}
                  emoji={SKILL_EMOJIS[key]}
                  description={SKILL_DESCRIPTIONS[key]}
                  onClick={handleFilterSelect(key)}
                />
              ))}
            </Menu.Group>
            <Menu.Group title="Filters">
              {filterOptions.map(({ key, label, icon, options, selectionMode }) => (
                <Menu.Item
                  key={key}
                  isSelected={Object.keys(filters).includes(key)}
                  label={label}
                  icon={icon}
                  options={options}
                  selectionMode={selectionMode}
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
