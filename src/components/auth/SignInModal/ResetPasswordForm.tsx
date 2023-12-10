import { Button, Input } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

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

export const ResetPasswordForm: React.FC<Props> = ({ onClick, onSuccess }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });
  const pushNotification = useNotifications((state) => state.pushNotification);
  const { mutate, isLoading } = useMutation(requestResetPassword, {
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
        placeholder="Email"
        aria-label="Email"
        isDisabled={isLoading}
        isInvalid={!!errors.email}
        labelPlacement="outside"
        {...register('email', VALIDATION_RULES.REQUIRED)}
      />
      <div className="flex justify-between gap-4 mt-8 mb-2">
        <Button variant="light" color="secondary" onClick={onClick}>Sign in</Button>
        <Button type="submit" variant="flat" color="secondary" isLoading={isLoading}>
          Send email
        </Button>
      </div>
    </form>
  );
};
