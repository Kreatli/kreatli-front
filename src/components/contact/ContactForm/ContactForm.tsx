import { Button, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useNotifications } from '../../../hooks/useNotifications';
import { requestContactFormSubmission } from '../../../services/contact';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const initialValues = {
  email: '',
  name: '',
  message: '',
};

type InitialValues = typeof initialValues;

export const ContactForm = () => {
  const { pushNotification } = useNotifications();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: initialValues,
    mode: 'onBlur',
  });

  const { isLoading, mutate } = useMutation(requestContactFormSubmission, {
    onSuccess: () => {
      reset();
      pushNotification({
        message: 'Thanks for reaching out to us! We will get back to you as soon as possible',
        color: 'success',
        icon: 'success',
      });
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const onSubmit = (data: InitialValues) => {
    mutate(data);
  };

  return (
    <form noValidate className="flex flex-col gap-4 text-start" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email"
          placeholder="john.doe@domain.com"
          isDisabled={isLoading}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register('email', VALIDATION_RULES.EMAIL)}
        />
        <Input
          label="Name"
          placeholder="John Doe"
          isDisabled={isLoading}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          {...register('name', VALIDATION_RULES.SHORT_TEXT)}

        />
      </div>
      <Textarea
        label="Message"
        placeholder="Hi there! I would like to know more about your platform..."
        minRows={8}
        isDisabled={isLoading}
        isInvalid={!!errors.message}
        errorMessage={errors.message?.message}
        {...register('message', VALIDATION_RULES.REQUIRED)}
      />
      <div className="mt-4 text-center">
        <Button type="submit" color="secondary" variant="flat" isLoading={isLoading} className="px-12">
          Submit
        </Button>
      </div>
    </form>
  );
};
