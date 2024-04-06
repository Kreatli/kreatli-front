import { Button, Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useNotifications } from '../../../hooks/useNotifications';
import { requestSignUpCreator } from '../../../services/auth';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { InputPassword } from '../../various/InputPassword';

const DEFAULT_VALUES = {
  email: '',
  password: '',
  youtubeUrl: '',
};

type FormFields = typeof DEFAULT_VALUES;

interface Props {
  onSuccess?: () => void;
}

export const SignUpCreatorForm = ({ onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    defaultValues: DEFAULT_VALUES,
  });

  const { pushNotification } = useNotifications();

  const { mutate, isPending } = useMutation({
    mutationFn: requestSignUpCreator,
    onSuccess: () => {
      pushNotification({
        message: 'Cool! Now all you have to do is check your inbox to complete the registration',
        color: 'success',
        icon: 'success',
      });
      onSuccess?.();
      window.rdt?.('track', 'SignUp', { value: 'creator' });
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const onSubmit = (values: FormFields) => {
    mutate(values);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          type="email"
          label="Email"
          size="sm"
          isDisabled={isPending}
          placeholder="john.doe@domain.com"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register('email', VALIDATION_RULES.EMAIL)}
        />
        <InputPassword
          label="Password"
          size="sm"
          isDisabled={isPending}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register('password', VALIDATION_RULES.PASSWORD)}
        />
        <Input
          type="url"
          label="Youtube channel"
          size="sm"
          isDisabled={isPending}
          placeholder="https://youtube.com/@mychannel"
          isInvalid={!!errors.youtubeUrl}
          errorMessage={errors.youtubeUrl?.message}
          {...register('youtubeUrl', VALIDATION_RULES.YOUTUBE_CHANNEL.REQUIRED)}
        />
      </div>
      <div className="mt-6">
        <Button type="submit" size="lg" color="secondary" variant="flat" fullWidth isLoading={isPending}>
          Sign up
        </Button>
      </div>
    </form>
  );
};
