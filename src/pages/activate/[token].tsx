import { useRouter } from 'next/router';
import React from 'react';
import { usePostAuthVerifyEmail } from '../../services/review-tool/hooks';
import { getHasToken } from '../../utils/token';
import { useNotifications } from '../../hooks/useNotifications';
import { getErrorMessage } from '../../utils/review-tool/getErrorMessage';

export default function Activate() {
  const router = useRouter();
  const { pushNotification } = useNotifications();
  const { mutate } = usePostAuthVerifyEmail();

  React.useEffect(() => {
    if (getHasToken()) {
      router.replace('/');

      return;
    }

    const { token } = router.query;

    if (token) {
      mutate(
        { requestBody: { token: token as string } },
        {
          onSuccess: () => {
            pushNotification({ icon: 'success', color: 'success', message: 'Your account was activated' });
            router.replace('/sign-in');
          },
          onError: (error) => {
            pushNotification({ icon: 'error', message: getErrorMessage(error) });
            router.push('/sign-in');
          },
        },
      );
    }
  }, [router]);

  return null;
}
