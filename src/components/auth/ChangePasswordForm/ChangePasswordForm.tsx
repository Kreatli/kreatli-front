import { Button } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { InputPassword } from '../../various/InputPassword';
import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useNotifications } from '../../../hooks/useNotifications';
import { requestChangePassword } from '../../../services/auth';
import { getErrorMessage } from '../../../utils/getErrorMessage';

const DEFAULT_VALUES = {
  password: '',
  passwordRepeat: '',
};

type DefaultValues = typeof DEFAULT_VALUES;

interface Props {
  token: string;
  onSuccess: () => void;
  onError?: () => void;
}

export const ChangePasswordForm = ({ token, onSuccess, onError }: Props) => {
  const pushNotification = useNotifications((state) => state.pushNotification);
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });
  const { isLoading, mutate } = useMutation(requestChangePassword, {
    onSuccess: () => {
      onSuccess();
      pushNotification({
        message: 'Your password has been changed',
        color: 'success',
        icon: 'success',
      });
    },
    onError: (error) => {
      onError?.();
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const onSubmit = ({ password }: DefaultValues) => {
    mutate({ token, password });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="text-2xl font-semibold mb-4">Create a new password</h3>
      <div className="flex flex-col gap-4">
        <InputPassword
          placeholder="New password"
          aria-label="New password"
          isDisabled={isLoading}
          fullWidth
          validationState={errors.password && 'invalid'}
          errorMessage={errors.password?.message}
          {...register('password', VALIDATION_RULES.PASSWORD)}
        />
        <InputPassword
          placeholder="Repeat new password"
          aria-label="Repeat new password"
          isDisabled={isLoading}
          fullWidth
          validationState={errors.passwordRepeat && 'invalid'}
          errorMessage={errors.passwordRepeat?.message}
          {...register('passwordRepeat', VALIDATION_RULES.PASSWORD)}
        />
        <div>
          <Button type="submit" color="secondary" isLoading={isLoading}>
            Change password
          </Button>
        </div>
      </div>
    </form>
  );
};
