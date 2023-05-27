import { Button, Grid, Loading, Spacer, Textarea } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { useNotifications } from '../../../hooks/useNotifications';
import { useSession } from '../../../hooks/useSession';
import { requestUserInvitation } from '../../../services/user';
import { Common } from '../../../typings/common';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  inviteeId: Common.Id;
  onCancel: () => void;
  onSuccess: () => void;
}

const DEFAULT_VALUES = {
  inviter: '',
  message: '',
};

type DefaultValues = typeof DEFAULT_VALUES;

export const InvitationForm: React.FC<Props> = ({ inviteeId, onCancel, onSuccess }) => {
  const { currentUserId } = useSession();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });
  const { mutate, isLoading } = useMutation(requestUserInvitation);
  const queryClient = useQueryClient();
  const pushNotification = useNotifications((state) => state.pushNotification);

  const onSubmit = (data: DefaultValues) => {
    mutate([inviteeId, { ...data, inviter: currentUserId }], {
      onSuccess: (user) => {
        queryClient.setQueryData(['user', inviteeId], user);
        onSuccess();
      },
      onError: (error: any) => {
        pushNotification({
          message: getErrorMessage(error),
          color: 'error',
          icon: 'error',
        });
      },
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid.Container gap={1}>
        <Grid xs={12}>
          <Textarea
            placeholder="Add a personalized note (optional)"
            aria-label="Add a personalized note (optional)"
            disabled={isLoading}
            status={errors.message && 'error'}
            fullWidth
            {...register('message')}
          />
        </Grid>
      </Grid.Container>
      <Spacer y={1} />
      <Grid.Container gap={1} justify="space-between">
        <Grid>
          <Button type="submit" auto flat disabled={isLoading}>
            {isLoading && <Loading size="xs" css={{ paddingRight: '$4' }} />}
            Send invitation
          </Button>
        </Grid>
        <Grid>
          <Button auto light color="primary" onClick={onCancel}>Cancel</Button>
        </Grid>
      </Grid.Container>
    </form>
  );
};
