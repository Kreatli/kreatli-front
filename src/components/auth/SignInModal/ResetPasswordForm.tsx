import { Button, Grid, Input, Loading, Spacer } from '@nextui-org/react';
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
      pushNotification({
        message: 'Follow the link sent to your email to reset your password',
        color: 'success',
        icon: 'success',
      });
      onSuccess();
    },
    onError: (error: any) => {
      const status = error?.response?.status;
      if (status === 404) {
        setError('email', {});
      }

      pushNotification({
        message: getErrorMessage(error),
        color: 'error',
        icon: 'error',
      });
    },
  });

  const onSubmit = (data: DefaultValues) => {
    mutate(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid.Container gap={1}>
        <Grid xs={12}>
          <Input
            placeholder="Email"
            aria-label="Email"
            disabled={isLoading}
            status={errors.email && 'error'}
            fullWidth
            {...register('email', VALIDATION_RULES.REQUIRED)}
          />
        </Grid>
      </Grid.Container>
      <Spacer y={1} />
      <Grid.Container gap={1} justify="space-between">
        <Grid>
          <Button type="submit" auto flat disabled={isLoading}>
            {isLoading && <Loading size="xs" css={{ paddingRight: '$4' }} />}
            Send email
          </Button>
        </Grid>
        <Grid>
          <Button auto light color="primary" onClick={onClick}>Sign in</Button>
        </Grid>
      </Grid.Container>
    </form>
  );
};
