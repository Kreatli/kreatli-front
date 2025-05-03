import { Button, Input } from '@heroui/react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../../constants/validationRules';
import { useNotifications } from '../../../../hooks/useNotifications';
import { requestResetPassword } from '../../../../services/marketplace/auth';
import { getErrorMessage } from '../../../../utils/marketplace/getErrorMessage';

interface Props {
  onClick: () => void;
  onSuccess: () => void;
}

const DEFAULT_VALUES = {
  email: '',
};

type DefaultValues = typeof DEFAULT_VALUES;

export const ResetPasswordForm = ({ onClick, onSuccess }: Props) => {
  const { t } = useTranslation(['common', 'signIn']);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  });

  const pushNotification = useNotifications((state) => state.pushNotification);

  const { mutate, isPending } = useMutation({
    mutationFn: requestResetPassword,
    onSuccess: () => {
      onSuccess();
      pushNotification({
        message: t('signIn:reset_password_success'),
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
        placeholder={t('common:email')}
        aria-label={t('common:email')}
        isDisabled={isPending}
        isInvalid={!!errors.email}
        labelPlacement="outside"
        {...register('email', VALIDATION_RULES.EMAIL)}
      />
      <div className="flex justify-between gap-4 mt-8 mb-2">
        <Button type="submit" variant="flat" color="secondary" isLoading={isPending}>
          {t('common:send_email')}
        </Button>
        <Button variant="light" color="secondary" onClick={onClick}>
          {t('signIn:sign_in')}
        </Button>
      </div>
    </form>
  );
};
