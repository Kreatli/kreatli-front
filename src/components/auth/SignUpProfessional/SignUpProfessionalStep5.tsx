import { Button, Input } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { Control, FieldErrors, useFieldArray } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { FileUploader } from '../../various/FileUploader';
import { Icon } from '../../various/Icon';
import { DEFAULT_CERTIFICATE, DefaultValues } from './constants';

interface Props {
  control: Control<DefaultValues>;
  errors: FieldErrors<DefaultValues>;
}

export const SignUpProfessionalStep5 = ({ control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'certificates' });

  const handleAddMore = () => {
    append({ ...DEFAULT_CERTIFICATE, id: nanoid() });
  };

  const handleRemove = (index: number) => () => {
    remove(index);
  };

  return (
    <div className="flex flex-col gap-4">
      {fields.map(({ id, name }, index) => (
        <div key={id} className="flex items-center gap-4">
          <Input
            label="Certificate's name"
            defaultValue={name}
            placeholder="Adobe Certified Expert in Premiere Pro"
            isInvalid={!!errors.certificates?.[index]?.name}
            errorMessage={errors.certificates?.[index]?.name?.message}
            {...control.register(`certificates.${index}.name`, VALIDATION_RULES.SHORT_TEXT)}
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
