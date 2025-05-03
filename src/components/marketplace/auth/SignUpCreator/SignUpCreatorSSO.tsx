import { Button } from '@heroui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { useNotifications } from '../../../../hooks/useNotifications';
import { requestSsoCreator } from '../../../../services/marketplace/auth';
import { getErrorMessage } from '../../../../utils/marketplace/getErrorMessage';
import { Icon } from '../../../various/Icon';

interface Props {
  onSuccess: () => void;
}

export const SignUpCreatorSSO = ({ onSuccess }: Props) => {
  const { t } = useTranslation(['signUp']);
  const router = useRouter();
  const queryClient = useQueryClient();
  const pushNotification = useNotifications((state) => state.pushNotification);

  const { mutate, isPending } = useMutation({
    mutationFn: requestSsoCreator,
    onSuccess: ({ token, user }) => {
      onSuccess();
      localStorage.setItem('token', token);
      queryClient.setQueryData(['user'], user);
      router.push(`/marketplace/profile/${user._id}`);
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
      window.rdt?.('track', 'Purchase');
    },
    onError: () => {
      pushNotification({
        message: t('signUp:sign_up_with_youtube_failure'),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  return (
    <Button size="lg" color="danger" variant="faded" isLoading={isPending} onClick={() => login()}>
      <Icon icon="youtube" />
      {t('signUp:sign_up_with_youtube')}
    </Button>
  );
};
