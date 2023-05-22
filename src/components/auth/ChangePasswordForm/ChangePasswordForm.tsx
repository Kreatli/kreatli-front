import { Button, Grid, Input, Loading, Text } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useNotifications } from '../../../hooks/useNotifications';
import { requestChangePassword } from '../../../services/auth';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';

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
        color: 'error',
        icon: 'error',
      });
    },
  });

  const onSubmit = ({ password }: DefaultValues) => {
    mutate({ token, password });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <Text h3>Create a new password</Text>
      <Grid.Container gap={2}>
        <Grid xs={12}>
          <Input.Password
            placeholder="New password"
            aria-label="New password"
            disabled={isLoading}
            fullWidth
            status={errors.password && 'error'}
            visibleIcon={<Icon icon="show" />}
            hiddenIcon={<Icon icon="hide" />}
            helperText={errors.password?.message}
            helperColor="error"
            {...register('password', VALIDATION_RULES.PASSWORD)}
          />
        </Grid>
        <Grid xs={12}>
          <Input.Password
            placeholder="Repeat new password"
            aria-label="Repeat new password"
            disabled={isLoading}
            fullWidth
            status={errors.passwordRepeat && 'error'}
            visibleIcon={<Icon icon="show" />}
            hiddenIcon={<Icon icon="hide" />}
            helperText={errors.passwordRepeat?.message}
            helperColor="error"
            {...register('passwordRepeat', VALIDATION_RULES.PASSWORD)}
          />
        </Grid>
        <Grid>
          <Button type="submit" color="gradient" disabled={isLoading}>
            {isLoading && <Loading size="xs" css={{ paddingRight: '$4' }} />}
            Change password
          </Button>
        </Grid>
      </Grid.Container>
    </form>
  );
};
