import { Button, Grid, Input, Loading, Modal, Spacer, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useNotifications } from '../../../hooks/useNotifications';
import { useSession } from '../../../hooks/useSession';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const DEFAULT_VALUES = {
  email: '',
  password: '',
};

type DefaultValues = typeof DEFAULT_VALUES;

export const SignInModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setError } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });
  const { signInMutation: { mutate, isLoading } } = useSession();
  const { pushNotification } = useNotifications();

  const onSubmit = (data: DefaultValues) => {
    mutate(data, {
      onSuccess: ({ user }) => {
        onClose();
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
          color: 'error',
          icon: 'error',
        });
      },
    });
  };

  return (
    <Modal
      closeButton
      blur
      aria-labelledby="modal-title"
      preventClose={isLoading}
      open={isVisible}
      onClose={onClose}
    >
      <Modal.Header>
        <Text h3>Sign in to your account</Text>
      </Modal.Header>
      <Modal.Body>
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
            <Grid xs={12}>
              <Input.Password
                placeholder="Password"
                aria-label="Password"
                disabled={isLoading}
                fullWidth
                status={errors.password && 'error'}
                visibleIcon={<Icon icon="show" />}
                hiddenIcon={<Icon icon="hide" />}
                {...register('password', VALIDATION_RULES.REQUIRED)}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={1} />
          <Grid.Container gap={1} justify="space-between">
            <Grid>
              <Button type="submit" auto flat disabled={isLoading}>
                {isLoading && <Loading size="xs" css={{ paddingRight: '$4' }} />}
                Sign in
              </Button>
            </Grid>
            <Grid>
              <Button auto light color="primary">Forgot password?</Button>
            </Grid>
          </Grid.Container>
        </form>
      </Modal.Body>
    </Modal>
  );
};
