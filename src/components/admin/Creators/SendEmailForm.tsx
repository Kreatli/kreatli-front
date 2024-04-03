import { Button, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';

interface Props {
  onClose: () => void;
  isPending: boolean;
  onSubmit: (data: { message: string }) => void;
}

export const SendEmailForm = ({ onClose, onSubmit, isPending }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { message: '', subject: 'Kreatli - ' },
    mode: 'onTouched',
  });

  return (
    <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          label="Subject"
          defaultValue="Kreatli - "
          isDisabled={isPending}
          isInvalid={!!errors.subject}
          {...register('subject', VALIDATION_RULES.SHORT_TEXT)}
        />
        <Textarea
          label="Message"
          placeholder="Remember that 'Hi {name}' is already included in the message."
          isDisabled={isPending}
          isInvalid={!!errors.message}
          {...register('message', VALIDATION_RULES.REQUIRED)}
        />
      </div>
      <div className="flex gap-4 justify-end mb-2">
        <Button variant="light" color="secondary" isDisabled={isPending} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant="flat" color="secondary" isLoading={isPending}>
          Send email
        </Button>
      </div>
    </form>
  );
};
