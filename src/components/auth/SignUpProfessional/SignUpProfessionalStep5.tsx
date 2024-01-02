import { Button, Input } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import { remove } from 'ramda';
import React from 'react';
import { Control, FieldErrors, useController, UseFormRegister } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { FileUploader } from '../../various/FileUploader';
import { Icon } from '../../various/Icon';
import { DEFAULT_CERTIFICATE, DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep5: React.FC<Props> = ({ control, errors, register }) => {
  const { field } = useController({ control, name: 'certificates' });

  const handleAddMore = () => {
    field.onChange([
      ...field.value,
      { ...DEFAULT_CERTIFICATE, id: nanoid() },
    ]);
    field.onBlur();
  };

  const handleRemove = (index: number) => () => {
    field.onChange(remove(index, 1, field.value));
    field.onBlur();
  };

  return (
    <div className="flex flex-col gap-4">
      {field.value.map(({ id, name }, index) => (
        <div key={id} className="flex items-center gap-4">
          <Input
            label="Certificate's name"
            defaultValue={name}
            placeholder="Adobe Certified Expert in Premiere Pro"
            isInvalid={!!errors.certificates?.[index]?.name}
            errorMessage={errors.certificates?.[index]?.name?.message}
            {...register(`certificates.${index}.name`, VALIDATION_RULES.SHORT_TEXT)}
          />
          <div className="flex-initial">
            <FileUploader
              control={control}
              name={`certificates.${index}.file`}
              status={errors.certificates?.[index]?.file && 'danger'}
              rules={VALIDATION_RULES.REQUIRED}
            />
          </div>
          <div className="flex-initial">
            <Button
              radius="full"
              color="danger"
              size="sm"
              aria-label="Delete certificate"
              isIconOnly
              onClick={handleRemove(index)}
            >
              <Icon icon="trash" size={18} />
            </Button>
          </div>
        </div>
      ))}
      <div>
        <Button size="sm" radius="full" variant="flat" color="secondary" startContent={<Icon icon="plus" size={18} />} onClick={handleAddMore}>
          Add certificate
        </Button>
      </div>
    </div>
  );
};
