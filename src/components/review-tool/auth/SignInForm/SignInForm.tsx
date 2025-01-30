import { Button, Input, Link } from '@nextui-org/react';
import { useGoogleLogin } from '@react-oauth/google';
import NextLink from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { useNotifications } from '../../../../hooks/useNotifications';
import { getAxiosInstance } from '../../../../services/review-tool/config';
import { usePostAuthSignIn, usePostAuthSsoGoogle } from '../../../../services/review-tool/hooks';
import { getErrorMessage } from '../../../../utils/review-tool/getErrorMessage';
import { Icon } from '../../../various/Icon';

const DEFAULT_VALUES = {
  email: '',
  password: '',
};

interface Props {
  email?: string;
  showSignUpLink?: boolean;
  onSuccess: () => void;
}

export const SignInForm = ({ email, showSignUpLink = true, onSuccess }: Props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: { ...DEFAULT_VALUES, email: email ?? DEFAULT_VALUES.email },
    mode: 'onTouched',
  });

  const { pushNotification } = useNotifications();
  const { mutate: signIn, isPending } = usePostAuthSignIn();
  const { mutate: ssoSignIn } = usePostAuthSsoGoogle();

  const onSubmit = (data: typeof DEFAULT_VALUES) => {
    signIn(
      { requestBody: data },
      {
        onSuccess: ({ token }) => {
          localStorage.setItem('token', token);
          getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${token}`;
          onSuccess();
        },
        onError: (error) => {
          pushNotification({ icon: 'error', message: getErrorMessage(error) });
        },
      },
    );
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      ssoSignIn(
        { requestBody: { token: response.access_token } },
        {
          onSuccess: ({ token }) => {
            localStorage.setItem('token', token);
            getAxiosInstance(undefined).defaults.headers.Authorization = `Bearer ${token}`;
            onSuccess();
          },
          onError: (error) => {
            pushNotification({ icon: 'error', message: getErrorMessage(error) });
          },
        },
      );
    },
    onError: () => {
      pushNotification({
        message: 'Failed to sign in with YouTube. Please try again later.',
        color: 'danger',
        icon: 'error',
      });
    },
  });

  return (
    <form noValidate className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
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
          {...register('password', VALIDATION_RULES.REQUIRED)}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button type="submit" className="bg-foreground text-content1" isLoading={isPending} fullWidth>
          Sign in
        </Button>
        <Button type="button" variant="bordered" fullWidth onClick={() => googleLogin()}>
          Sign in with <Icon icon="google" size={18} />
        </Button>
      </div>
      {showSignUpLink && (
        <div className="text-center">
          Don&apos;t have an account?{' '}
          <Link as={NextLink} href="/sign-up" color="foreground" underline="always">
            Sign up
          </Link>
        </div>
      )}
    </form>
  );
};
