import { Select, SelectItem } from '@nextui-org/react';
import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

import { SKILL_LABELS_FOR_PROFESSIONAL, SKILL_LEVEL_OPTIONS, SKILL_OPTIONS } from '../../../constants/skills';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { Skill } from '../../../typings/skill';
import { Tag } from '../../various/Tag';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep3: React.FC<Props> = ({ errors, control, register }) => {
  const [selectedSkills, setSelectedSkills] = React.useState<Skill[]>([]);

  return (
    <Tag.Group name="skills" control={control} rules={VALIDATION_RULES.REQUIRED} onChange={setSelectedSkills}>
      <div className="flex flex-wrap gap-2">
        {SKILL_OPTIONS.map((area) => (
          <Tag key={area.value} value={area.value} status={errors.skills && 'danger'}>
            {area.label}
          </Tag>
        ))}
      </div>
      {selectedSkills.length > 0 && (
        <div className="flex flex-col gap-2 mt-6">
          <h4 className="text-md font-semibold mb-2">Specify level of expertise:</h4>
          {selectedSkills.map((skill) => (
            <div key={skill} className="flex items-center gap-4">
              <p className="text-sm whitespace-nowrap">
                {SKILL_LABELS_FOR_PROFESSIONAL[skill]}
              </p>
              <Select
                label="Select level"
                size="sm"
                className="w-36"
                validationState={errors.skillLevels?.[skill] && 'invalid'}
                {...register(`skillLevels.${skill}`, VALIDATION_RULES.REQUIRED)}
              >
                {SKILL_LEVEL_OPTIONS.map((skillLevel) => (
                  <SelectItem key={skillLevel.value} value={skillLevel.value}>{skillLevel.label}</SelectItem>
                ))}
              </Select>
            </div>
          ))}
        </div>
      )}
    </Tag.Group>
  );
};
