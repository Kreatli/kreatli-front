import { Grid, Text } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { SKILL_LABELS_FOR_PROFESSIONAL, SKILL_LEVEL_OPTIONS, SKILL_OPTIONS_FOR_PROFESSIONAL } from '../../../constants/skills';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { Skill } from '../../../typings/skill';
import { Select } from '../../various/Select';
import { Tag } from '../../various/Tag';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep3: React.FC<Props> = ({ errors, control }) => {
  const [selectedSkills, setSelectedSkills] = React.useState<Skill[]>([]);

  return (
    <Tag.Group name="skills" control={control} rules={VALIDATION_RULES.REQUIRED} onChange={setSelectedSkills}>
      <Grid.Container gap={1}>
        {SKILL_OPTIONS_FOR_PROFESSIONAL.map((area) => (
          <Grid key={area.value}>
            <Tag value={area.value} status={errors.skills && 'error'}>
              {area.label}
            </Tag>
          </Grid>
        ))}
      </Grid.Container>
      {selectedSkills.length > 0 && (
        <Grid.Container gap={1}>
          <Grid xs={12}>
            <Text h4>Specify level of expertise:</Text>
          </Grid>
          {selectedSkills.map((skill) => (
            <Grid key={skill} xs={12} css={{ alignItems: 'center', gap: '0 1rem' }}>
              <Text css={{ whiteSpace: 'nowrap' }}>
                {SKILL_LABELS_FOR_PROFESSIONAL[skill]}
              </Text>
              <Select
                name={`skillLevels.${skill}`}
                aria-label={`Choose level of ${SKILL_LABELS_FOR_PROFESSIONAL[skill]}`}
                placeholder="Choose level..."
                status={errors.skillLevels?.[skill] && 'error'}
                options={SKILL_LEVEL_OPTIONS}
                control={control}
                color="primary"
                rules={VALIDATION_RULES.REQUIRED}
              />
            </Grid>
          ))}
        </Grid.Container>
      )}
    </Tag.Group>
  );
};
