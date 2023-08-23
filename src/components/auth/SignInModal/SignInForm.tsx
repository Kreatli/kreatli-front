import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useNotifications } from '../../../hooks/useNotifications';
import { useSession } from '../../../hooks/useSession';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  onClick: () => void;
  onSuccess: () => void;
}

const DEFAULT_VALUES = {
  email: '',
  password: '',
};

type DefaultValues = typeof DEFAULT_VALUES;

export const SignInForm: React.FC<Props> = ({ onClick, onSuccess }) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setError } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });
  const { signInMutation: { mutate, isLoading } } = useSession();
  const pushNotification = useNotifications((state) => state.pushNotification);

  const onSubmit = (data: DefaultValues) => {
    mutate(data, {
      onSuccess: ({ user }) => {
        onSuccess();
        router.push(`/profile/${user._id}`);
      },
      onError: (error: any) => {
        const status = error?.response?.status;
        if (status === 404) {
          setError('email', {});
        }

        if (status === 401) {
          setError('password', {});
        }

        pushNotification({
          message: getErrorMessage(error),
          color: 'danger',
          icon: 'error',
        });
      },
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          placeholder="Email"
          aria-label="Email"
          isDisabled={isLoading}
          validationState={errors.email && 'invalid'}
          fullWidth
          {...register('email', VALIDATION_RULES.REQUIRED)}
        />
        <Input
          type="password"
          placeholder="Password"
          aria-label="Password"
          isDisabled={isLoading}
          fullWidth
          validationState={errors.password && 'invalid'}
          {...register('password', VALIDATION_RULES.REQUIRED)}
        />
      </div>
      <div className="flex justify-between gap-4 mt-8 mb-2">
        <Button type="submit" variant="flat" color="secondary" isLoading={isLoading}>
          Sign in
        </Button>
        <Button variant="light" color="secondary" onClick={onClick}>Forgot password?</Button>
      </div>
    </form>
  );
};
