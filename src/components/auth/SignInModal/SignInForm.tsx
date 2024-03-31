import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useNotifications } from '../../../hooks/useNotifications';
import { useSession } from '../../../hooks/useSession';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { InputPassword } from '../../various/InputPassword';
import { SignInCreatorSSO } from './SignInCreatorSSO';

interface Props {
  onClick: () => void;
  onSuccess: () => void;
}

const DEFAULT_VALUES = {
  email: '',
  password: '',
};

type DefaultValues = typeof DEFAULT_VALUES;

export const SignInForm = ({ onClick, onSuccess }: Props) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setError } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onTouched' });
  const { signInMutation: { mutate, isPending } } = useSession();
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
          type="email"
          placeholder="Email"
          aria-label="Email"
          isDisabled={isPending}
          isInvalid={!!errors.email}
          labelPlacement="outside"
          {...register('email', VALIDATION_RULES.REQUIRED)}
        />
        <InputPassword
          placeholder="Password"
          aria-label="Password"
          isDisabled={isPending}
          labelPlacement="outside"
          isInvalid={!!errors.password}
          {...register('password', VALIDATION_RULES.REQUIRED)}
        />
      </div>
      <div className="flex justify-between gap-2 mt-6 mb-4">
        <Button type="submit" variant="flat" color="secondary" isLoading={isPending}>
          Sign in
        </Button>
        <Button variant="light" color="secondary" onClick={onClick}>Forgot password?</Button>
      </div>
      {process.env.ENABLE_GOOGLE_OAUTH === 'true' && (
        <>
          <div className="flex items-center mb-4 text-sm text-foreground-500 after:flex-1 after:content-[''] after:p-[0.5px] after:bg-foreground-200 after:m-2 before:flex-1 before:content-[''] before:p-[0.5px] before:bg-foreground-200 before:m-2">YouTube creator?</div>
          <SignInCreatorSSO onSuccess={onSuccess} />
        </>
      )}
    </form>
  );
};
