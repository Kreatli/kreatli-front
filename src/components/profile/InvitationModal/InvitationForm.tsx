import { Button, Textarea } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useNotifications } from '../../../hooks/useNotifications';
import { useSession } from '../../../hooks/useSession';
import { requestUserInvitation } from '../../../services/user';
import { Common } from '../../../typings/common';
import { getErrorMessage } from '../../../utils/getErrorMessage';

interface Props {
  userId: Common.Id;
  onCancel: () => void;
  onSuccess: () => void;
}

const DEFAULT_VALUES = {
  inviter: '',
  message: '',
};

type DefaultValues = typeof DEFAULT_VALUES;

export const InvitationForm = ({ userId, onCancel, onSuccess }: Props) => {
  const { register, handleSubmit } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onTouched' });
  const pushNotification = useNotifications((state) => state.pushNotification);

  const { currentUserId } = useSession();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: requestUserInvitation,
    onSuccess: (user) => {
      queryClient.setQueryData(['user', userId], user);
      queryClient.refetchQueries({ queryKey: ['user'] });
      onSuccess();
    },
    onError: (error: any) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const onSubmit = (data: DefaultValues) => {
    mutate([userId, { ...data, inviter: currentUserId }]);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        placeholder="Add a personalized note (optional)"
        aria-label="Add a personalized note (optional)"
        isDisabled={isPending}
        fullWidth
        {...register('message')}
      />
      <div className="flex justify-between gap-4 mt-8 mb-2">
        <div>
          <Button type="submit" variant="flat" color="secondary" isLoading={isPending}>
            Send invitation
          </Button>
        </div>
        <div>
          <Button variant="light" color="secondary" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </form>
  );
};
