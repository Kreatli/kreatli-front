import { Button, Input, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { useNotifications } from '../../../../hooks/useNotifications';
import { usePostAuthSignUp } from '../../../../services/review-tool/hooks';
import { getErrorMessage } from '../../../../utils/review-tool/getErrorMessage';
import { Icon } from '../../../various/Icon';
import { SignUpThankYouMessage } from './SignUpThankYouMessage';

const DEFAULT_VALUES = {
  name: '',
  email: '',
  password: '',
};

export const SignUpForm = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const { pushNotification } = useNotifications();
  const { mutate, isPending, isSuccess } = usePostAuthSignUp();

  const onSubmit = (data: typeof DEFAULT_VALUES) => {
    mutate(
      { requestBody: data },
      {
        onSuccess: () => {},
        onError: (error) => {
          pushNotification({ icon: 'error', message: getErrorMessage(error) });
        },
      },
    );
  };

  if (isSuccess) {
    return <SignUpThankYouMessage />;
  }

  return (
    <form noValidate className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          label="Name"
          placeholder="John Doe"
          variant="faded"
          isInvalid={!!errors.name}
          labelPlacement="outside"
          {...register('name', VALIDATION_RULES.SHORT_TEXT)}
        />
        <Input
          label="Email"
          placeholder="example@mail.com"
          variant="faded"
          labelPlacement="outside"
          type="email"
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register('email', VALIDATION_RULES.EMAIL)}
        />
        <Input
          label="Password"
          placeholder=" "
          variant="faded"
          labelPlacement="outside"
          type="password"
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register('password', VALIDATION_RULES.PASSWORD)}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button type="submit" className="bg-foreground text-content1" isLoading={isPending} fullWidth>
          Sign up
        </Button>
        <Button type="submit" variant="bordered" fullWidth>
          Sign up with <Icon icon="google" size={18} />
        </Button>
      </div>
      <div className="text-center">
        Already have an account?{' '}
        <Link as={NextLink} href="/sign-in" color="foreground" underline="always">
          Sign in
        </Link>
      </div>
    </form>
  );
};
