import { Grid } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { SKILL_OPTIONS_FOR_CREATOR } from '../../../constants/skills';
import { Tag } from '../../various/Tag';
import { DefaultValues, VALIDATIONS } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpCreatorStep3: React.FC<Props> = ({ control, errors }) => {
  return (
    <Tag.Group name="interestSkills" control={control} rules={VALIDATIONS.interestSkills}>
      <Grid.Container gap={1}>
        {SKILL_OPTIONS_FOR_CREATOR.map((area) => (
          <Grid key={area.value}>
            <Tag value={area.value} status={errors.interestSkills && 'error'}>
              {area.label}
            </Tag>
          </Grid>
        ))}
      </Grid.Container>
    </Tag.Group>
  );
};
