import { Grid } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { SKILL_OPTIONS } from '../../../constants/skills';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { Tag } from '../../various/Tag';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const JobsCreationStep2: React.FC<Props> = ({ control, errors }) => {
  return (
    <Tag.Group name="skills" control={control} rules={VALIDATION_RULES.REQUIRED}>
      <Grid.Container gap={1}>
        {SKILL_OPTIONS.map((area) => (
          <Grid key={area.value}>
            <Tag value={area.value} status={errors.skills && 'error'}>
              {area.label}
            </Tag>
          </Grid>
        ))}
      </Grid.Container>
    </Tag.Group>
  );
};
