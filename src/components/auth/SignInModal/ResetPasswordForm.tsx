import { Button, Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useNotifications } from '../../../hooks/useNotifications';
import { requestResetPassword } from '../../../services/auth';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  onClick: () => void;
  onSuccess: () => void;
}

const DEFAULT_VALUES = {
  email: '',
};

type DefaultValues = typeof DEFAULT_VALUES;

export const ResetPasswordForm = ({ onClick, onSuccess }: Props) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const pushNotification = useNotifications((state) => state.pushNotification);

  const { mutate, isPending } = useMutation({
    mutationFn: requestResetPassword,
    onSuccess: () => {
      onSuccess();
      pushNotification({
        message: 'Follow the link sent to your email to reset your password',
        color: 'success',
        icon: 'success',
      });
    },
    onError: (error: any) => {
      const status = error?.response?.status;
      if (status === 404) {
        setError('email', {});
      }

      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const onSubmit = (data: DefaultValues) => {
    mutate(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        placeholder="Email"
        aria-label="Email"
        isDisabled={isPending}
        isInvalid={!!errors.email}
        labelPlacement="outside"
        {...register('email', VALIDATION_RULES.REQUIRED)}
      />
      <div className="flex justify-between gap-4 mt-8 mb-2">
        <Button type="submit" variant="flat" color="secondary" isLoading={isPending}>
          Send email
        </Button>
        <Button variant="light" color="secondary" onClick={onClick}>Sign in</Button>
      </div>
    </form>
  );
};
