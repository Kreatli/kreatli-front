import { Button, Input, Link } from '@heroui/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { useSession } from '../../../../hooks/marketplace/useSession';
import { useNotifications } from '../../../../hooks/useNotifications';
import { getErrorMessage } from '../../../../utils/marketplace/getErrorMessage';
import { InputPassword } from '../../../various/InputPassword';
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
  const { t } = useTranslation(['common']);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onTouched' });
  const {
    signInMutation: { mutate, isPending },
  } = useSession();
  const pushNotification = useNotifications((state) => state.pushNotification);

  const onSubmit = (data: DefaultValues) => {
    mutate(data, {
      onSuccess: ({ user }) => {
        onSuccess();
        router.push(`/marketplace/profile/${user._id}`);
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
          placeholder={t('common:email')}
          aria-label={t('common:email')}
          isDisabled={isPending}
          isInvalid={!!errors.email}
          labelPlacement="outside"
          {...register('email', VALIDATION_RULES.EMAIL)}
        />
        <div className="flex flex-col gap-2 items-end">
          <InputPassword
            placeholder="Password"
            aria-label="Password"
            isDisabled={isPending}
            labelPlacement="outside"
            isInvalid={!!errors.password}
            {...register('password', VALIDATION_RULES.REQUIRED)}
          />
          <Link as="button" type="button" color="secondary" size="sm" onClick={onClick}>
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="mt-4 mb-6">
        <Button type="submit" variant="flat" fullWidth color="secondary" isLoading={isPending}>
          Sign in
        </Button>
      </div>
      <div className="flex items-center mb-6 text-sm text-foreground-500 after:flex-1 after:content-[''] after:p-[0.5px] after:bg-foreground-200 after:m-2 before:flex-1 before:content-[''] before:p-[0.5px] before:bg-foreground-200 before:m-2">
        YouTube creator?
      </div>
      <SignInCreatorSSO onSuccess={onSuccess} />
    </form>
  );
};
