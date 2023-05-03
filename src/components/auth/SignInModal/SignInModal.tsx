import { Button, Grid, Input, Loading, Modal, Spacer, Text } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { VALIDATION_RULES } from '../../../constants/validationRules';
import { useSession } from '../../../hooks/useSession';
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
  const { register, handleSubmit } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });
  const { signInMutation: { mutate, isLoading } } = useSession();

  const onSubmit = (data: DefaultValues) => {
    mutate(data, {
      onSuccess: ({ user }) => {
        onClose();
        router.push(`/profile/${user._id}`);
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
                fullWidth
                {...register('email', VALIDATION_RULES.EMAIL)}
              />
            </Grid>
            <Grid xs={12}>
              <Input.Password
                placeholder="Password"
                aria-label="Password"
                disabled={isLoading}
                fullWidth
                visibleIcon={<Icon icon="show" />}
                hiddenIcon={<Icon icon="hide" />}
                {...register('password', VALIDATION_RULES.PASSWORD)}
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
