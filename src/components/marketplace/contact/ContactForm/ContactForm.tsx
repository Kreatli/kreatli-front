import { Button, Input, Textarea } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { useNotifications } from '../../../../hooks/useNotifications';
import { requestContactFormSubmission } from '../../../../services/marketplace/contact';
import { getErrorMessage } from '../../../../utils/marketplace/getErrorMessage';

const initialValues = {
  email: '',
  name: '',
  message: '',
};

type InitialValues = typeof initialValues;

export const ContactForm = () => {
  const { t } = useTranslation(['common']);
  const { pushNotification } = useNotifications();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    mode: 'onTouched',
  });

  const { isPending, mutate } = useMutation({
    mutationFn: requestContactFormSubmission,
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
          type="email"
          label={t('common:email')}
          placeholder="john.doe@domain.com"
          isDisabled={isPending}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register('email', VALIDATION_RULES.EMAIL)}
        />
        <Input
          label="Name"
          placeholder="John Doe"
          isDisabled={isPending}
          isInvalid={!!errors.name}
          errorMessage={errors.name?.message}
          {...register('name', VALIDATION_RULES.SHORT_TEXT)}
        />
      </div>
      <Textarea
        label="Message"
        placeholder="Hi there! I would like to know more about your platform..."
        minRows={8}
        isDisabled={isPending}
        isInvalid={!!errors.message}
        errorMessage={errors.message?.message}
        {...register('message', VALIDATION_RULES.REQUIRED)}
      />
      <div className="mt-4 text-center">
        <Button type="submit" color="secondary" variant="flat" isLoading={isPending} className="px-12">
          {t('common:submit')}
        </Button>
      </div>
    </form>
  );
};
