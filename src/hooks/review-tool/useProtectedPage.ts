import { useRouter } from 'next/router';
import React from 'react';

import { useSession } from './useSession';

export const useProtectedPage = () => {
  const router = useRouter();
  const { isSignedIn, isLoading } = useSession();

  React.useEffect(() => {
    if (!isLoading && !isSignedIn) {
      router.replace('/');
    }
  }, [isLoading, isSignedIn, router]);

  return {
    isSignedIn,
  };
};
