import { Button, Input, Textarea } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import { remove } from 'ramda';
import React from 'react';
import { Control, FieldErrors, useController, UseFormRegister } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { AvatarUploader } from '../../various/AvatarUploader';
import { Icon } from '../../various/Icon';
import { DEFAULT_EXPERIENCE, DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep4 = ({ control, errors, register }: Props) => {
  const { field } = useController({ control, name: 'experiences', rules: VALIDATION_RULES.REQUIRED });

  const handleAddMore = () => {
    field.onChange([
      ...field.value,
      { ...DEFAULT_EXPERIENCE, id: nanoid() },
    ]);
    field.onBlur();
  };

  const handleRemove = (index: number) => () => {
    field.onChange(remove(index, 1, field.value));
    field.onBlur();
  };

  return (
    <div className="flex flex-col gap-8">
      {field.value.map(({ id, companyName, companyUrl, description }, index) => (
        <div key={id} className="flex gap-4">
          <div className="flex-1 grid grid-cols-[auto_1fr] gap-4">
            <div>
              <AvatarUploader
                label="logo"
                control={control}
                name={`experiences.${index}.imageUrl`}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Input
                placeholder="Channel/Company"
                aria-label="Channel/Company"
                startContent={<Icon className="text-gray-400" icon="building" size={20} />}
                labelPlacement="outside"
                defaultValue={companyName}
                isInvalid={!!errors.experiences?.[index]?.companyName}
                errorMessage={errors.experiences?.[index]?.companyName?.message}
                {...register(`experiences.${index}.companyName`, VALIDATION_RULES.SHORT_TEXT)}
              />
              <Input
                placeholder="Channel/Company link"
                aria-label="Channel/Company link"
                startContent={<Icon className="text-gray-400" icon="link" size={20} />}
                labelPlacement="outside"
                defaultValue={companyUrl}
                isInvalid={!!errors.experiences?.[index]?.companyUrl}
                errorMessage={errors.experiences?.[index]?.companyUrl?.message}
                {...register(`experiences.${index}.companyUrl`, VALIDATION_RULES.URL.REQUIRED)}
              />
            </div>
            <div className="col-span-2">
              <Textarea
                label="Description"
                defaultValue={description}
                placeholder="Highlight key responsibilities, projects, and achievements from this job. Focus on demonstrating your expertise, skills, and the value you can bring to potential clients."
                isInvalid={!!errors.experiences?.[index]?.description}
                errorMessage={errors.experiences?.[index]?.description?.message}
                {...register(`experiences.${index}.description`, VALIDATION_RULES.DESCRIPTION.MIN_100)}
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
        <Button size="sm" radius="full" variant="flat" color="secondary" startContent={<Icon icon="plus" size={18} />} onClick={handleAddMore}>
          Add more
        </Button>
      </div>
    </div>
  );
};
