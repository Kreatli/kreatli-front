import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React from 'react';

import { requestSignIn } from '../services/auth';
import { requestCurrentUser } from '../services/user';
import { useApplicationLoader } from './useApplicationLoader';

export const useSession = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setIsLoading = useApplicationLoader((state) => state.setIsLoading);

  const signInMutation = useMutation({
    mutationFn: requestSignIn,
    onSuccess: ({ token, user }) => {
      localStorage.setItem('token', token);
      queryClient.setQueryData(['user'], user);
    },
  });

  const signOut = React.useCallback(() => {
    localStorage.removeItem('token');
    queryClient.setQueryData(['user'], null);
    router.push('/');
  }, [queryClient, router]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: requestCurrentUser,
    refetchOnMount: false,
  });

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

  return {
    isSignedIn: !!data,
    signInMutation,
    signOut,
    isLoading,
    currentUser: data,
    currentUserId: data?._id,
  };
};
