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

export const SignUpCreatorSSO = ({ onSuccess }: Props) => {
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
      window.rdt?.('track', 'SignUp', { value: 'creator' });
    },
    onError: () => {
      pushNotification({
        message: 'Failed to sign up with YouTube. Please try again.',
        color: 'danger',
        icon: 'error',
      });
    },
  });

  return (
    <Button size="lg" color="danger" variant="faded" isLoading={isPending} onClick={() => login()}>
      <Icon icon="youtube" />
      Sign up with YouTube
    </Button>
  );
};
