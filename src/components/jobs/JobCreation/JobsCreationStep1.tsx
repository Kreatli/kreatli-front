import { Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { DefaultValues, DESCRIPTION_PLACEHOLDER, SHORT_DESCRIPTION_PLACEHOLDER } from './constants';

interface Props {
  errors: FieldErrors<DefaultValues>;
  register: UseFormRegister<DefaultValues>;
}

export const JobsCreationStep1: React.FC<Props> = ({ errors, register }) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <Input
        label="Title"
        placeholder="YouTube Video Editor"
        fullWidth
        isInvalid={!!errors.title}
        errorMessage={errors.title?.message}
        {...register('title', VALIDATION_RULES.SHORT_TEXT)}
      />
      <Textarea
        label="Short description"
        placeholder={SHORT_DESCRIPTION_PLACEHOLDER}
        fullWidth
        isInvalid={!!errors.shortDescription}
        errorMessage={errors.shortDescription?.message}
        {...register('shortDescription', VALIDATION_RULES.SHORT_TEXT)}
      />
      <Textarea
        label="Description"
        placeholder={DESCRIPTION_PLACEHOLDER}
        fullWidth
        minRows={5}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        {...register('description', VALIDATION_RULES.DESCRIPTION.MIN_100)}
      />
    </div>
  );
};
