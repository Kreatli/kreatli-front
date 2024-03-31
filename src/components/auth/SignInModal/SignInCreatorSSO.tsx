import { Button } from '@nextui-org/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import { useNotifications } from '../../../hooks/useNotifications';
import { requestSsoCreator } from '../../../services/auth';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { Icon } from '../../various/Icon';

interface Props {
  onSuccess: () => void;
}

export const SignInCreatorSSO = ({ onSuccess }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pushNotification = useNotifications((state) => state.pushNotification);

  const { mutate, isPending } = useMutation({
    mutationFn: requestSsoCreator,
    onSuccess: ({ token, user }) => {
      onSuccess();
      localStorage.setItem('token', token);
      queryClient.setQueryData(['user'], user);
      router.push(`/profile/${user._id}`);
    },
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const login = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/youtube.readonly',
    onSuccess: (response) => {
      mutate(response);
    },
    onError: () => {
      pushNotification({
        message: 'Failed to sign in with YouTube. Please try again.',
        color: 'danger',
        icon: 'error',
      });
    },
  });

  return (
    <Button color="danger" variant="faded" fullWidth isLoading={isPending} onClick={() => login()}>
      <Icon icon="youtube" />
      Sign in with YouTube
    </Button>
  );
};
