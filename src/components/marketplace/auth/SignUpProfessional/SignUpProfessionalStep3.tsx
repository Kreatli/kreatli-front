import { Select, SelectItem } from '@heroui/react';
import React from 'react';
import { Control, FieldErrors, useController, UseFormRegister } from 'react-hook-form';

import {
  SKILL_LABELS_FOR_PROFESSIONAL,
  SKILL_LEVEL_OPTIONS,
  SKILL_OPTIONS,
} from '../../../../constants/marketplace/skills';
import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { Skill } from '../../../../typings/marketplace/skill';
import { Tag } from '../../../various/Tag';
import { DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep3 = ({ errors, control, register }: Props) => {
  const { field: skillsField } = useController({ control, name: 'skills' });
  const [selectedSkills, setSelectedSkills] = React.useState<Skill[]>(skillsField.value ?? []);

  const validateSkills = (skills: any) => {
    if (skills.length === 0) {
      return false;
    }

    if (skills.length > 3) {
      return 'You can select up to 3 skills';
    }

    return true;
  };

  return (
    <>
      <Tag.Group
        name="skills"
        max={3}
        control={control}
        rules={{ validate: validateSkills }}
        onChange={setSelectedSkills}
      >
        <div className="flex flex-wrap gap-2">
          {SKILL_OPTIONS.map((area) => (
            <Tag key={area.value} value={area.value} status={errors.skills && 'danger'}>
              {area.label}
            </Tag>
          ))}
        </div>
      </Tag.Group>
      {errors.skills && <p className="text-danger text-sm mt-2">{errors.skills.message}</p>}
      {selectedSkills.length > 0 && (
        <div className="flex flex-col gap-2 mt-6">
          <h4 className="text-md font-semibold mb-2">Specify level of expertise:</h4>
          {selectedSkills.map((skill) => (
            <div key={skill} className="flex items-center gap-4">
              <p className="text-sm whitespace-nowrap">{SKILL_LABELS_FOR_PROFESSIONAL[skill]}</p>
              <Select
                label="Select level"
                size="sm"
                className="w-36"
                disallowEmptySelection
                isInvalid={!!errors.skillLevels?.[skill]}
                {...register(`skillLevels.${skill}`, VALIDATION_RULES.REQUIRED)}
              >
                {SKILL_LEVEL_OPTIONS.map((skillLevel) => (
                  <SelectItem key={skillLevel.value}>{skillLevel.label}</SelectItem>
                ))}
              </Select>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
