import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import { SKILL_OPTIONS_FOR_CREATOR } from '../../../constants/skills';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { Tag } from '../../various/Tag';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpCreatorStep3 = ({ control, errors }: Props) => {
  return (
    <Tag.Group name="interestSkills" control={control} rules={VALIDATION_RULES.REQUIRED}>
      <div className="flex flex-wrap gap-2">
        {SKILL_OPTIONS_FOR_CREATOR.map((area) => (
          <Tag key={area.value} value={area.value} status={errors.interestSkills && 'danger'}>
            {area.label}
          </Tag>
        ))}
      </div>
    </Tag.Group>
  );
};
