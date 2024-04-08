import { Button, Input, Textarea } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { Control, FieldErrors, useFieldArray } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { AvatarUploader } from '../../various/AvatarUploader';
import { Icon } from '../../various/Icon';
import { DEFAULT_EXPERIENCE, DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep4 = ({ control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experiences',
    rules: VALIDATION_RULES.REQUIRED,
  });

  const handleAddMore = () => {
    append({ ...DEFAULT_EXPERIENCE, id: nanoid() });
  };

  const handleRemove = (index: number) => () => {
    remove(index);
  };

  return (
    <div className="flex flex-col gap-8">
      {fields.map(({ id, companyName, companyUrl, description }, index) => (
        <div key={id} className="flex gap-4">
          <div className="flex-1 grid grid-cols-[auto_1fr] gap-4">
            <div>
              <AvatarUploader label="logo" control={control} name={`experiences.${index}.imageUrl`} />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Channel/Company"
                aria-label="Channel/Company"
                defaultValue={companyName}
                startContent={<Icon className="text-gray-400" icon="building" size={20} />}
                labelPlacement="outside"
                isInvalid={!!errors.experiences?.[index]?.companyName}
                errorMessage={errors.experiences?.[index]?.companyName?.message}
                {...control.register(`experiences.${index}.companyName`, VALIDATION_RULES.SHORT_TEXT)}
              />
              <Input
                placeholder="Channel/Company link"
                aria-label="Channel/Company link"
                defaultValue={companyUrl}
                startContent={<Icon className="text-gray-400" icon="link" size={20} />}
                labelPlacement="outside"
                isInvalid={!!errors.experiences?.[index]?.companyUrl}
                errorMessage={errors.experiences?.[index]?.companyUrl?.message}
                {...control.register(`experiences.${index}.companyUrl`, VALIDATION_RULES.URL.REQUIRED)}
              />
            </div>
            <div className="col-span-2">
              <Textarea
                label="Description"
                defaultValue={description}
                placeholder="Highlight key responsibilities, projects, and achievements from this job. Focus on demonstrating your expertise, skills, and the value you can bring to potential clients."
                isInvalid={!!errors.experiences?.[index]?.description}
                errorMessage={errors.experiences?.[index]?.description?.message}
                {...control.register(`experiences.${index}.description`, VALIDATION_RULES.DESCRIPTION.MIN_100)}
              />
            </div>
          </div>
          <div className="flex-initial">
            <Button
              isIconOnly
              radius="full"
              color="danger"
              size="sm"
              aria-label="Delete experience"
              isDisabled={index === 0}
              onClick={handleRemove(index)}
            >
              <Icon icon="trash" size={18} />
            </Button>
          </div>
        </div>
      ))}
      <div>
        <Button
          size="sm"
          radius="full"
          variant="flat"
          color="secondary"
          startContent={<Icon icon="plus" size={18} />}
          onClick={handleAddMore}
        >
          Add more
        </Button>
      </div>
    </div>
  );
};
