import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import { getAxiosInstance } from '../../services/review-tool/config';
import { useGetUser } from '../../services/review-tool/hooks';
import { getUser } from '../../services/review-tool/services';
import { getHasToken } from '../../utils/token';
import { useReviewToolLoader } from './useReviewToolLoader';

export const useSession = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const hasToken = getHasToken();

  const setIsLoading = useReviewToolLoader((state) => state.setIsLoading);

  const { data, isLoading, isError } = useGetUser({
    enabled: hasToken,
    refetchOnMount: false,
  });

  React.useEffect(() => {
    if (!hasToken) {
      setIsLoading(false);
    }
  }, [hasToken, setIsLoading]);

  React.useEffect(() => {
    if (data && !isLoading) {
      setIsLoading(false);
    }
  }, [data, isLoading, setIsLoading]);

  React.useEffect(() => {
    if (isError) {
      localStorage.removeItem('token');
      setIsLoading(false);
    }
  }, [isError, setIsLoading]);

  const signOut = () => {
    localStorage.removeItem('token');
    getAxiosInstance(undefined).defaults.headers.Authorization = null;
    queryClient.resetQueries({ queryKey: [getUser.key] });
    router.push('/');
  };

  return {
    isSignedIn: !!data,
    isLoading,
    signOut,
    user: data,
  };
};
