import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { requestSignIn } from '../services/auth';
import { requestUser } from '../services/user';
import { useApplicationLoader } from './useApplicationLoader';

export const useSession = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setIsLoading = useApplicationLoader((state) => state.setIsLoading);

  const signInMutation = useMutation(requestSignIn, {
    onSuccess: ({ token, user }) => {
      localStorage.setItem('token', token);
      queryClient.setQueryData('user', user);
    },
  });

  const signOut = React.useCallback(() => {
    localStorage.removeItem('token');
    queryClient.setQueryData('user', undefined);
    router.push('/');
  }, [queryClient, router]);

  const { data } = useQuery('user', requestUser, {
    onSettled: () => {
      setIsLoading(false);
    },
    onError: () => {
      localStorage.removeItem('token');
    },
  });

  return {
    isSignedIn: !!data,
    signInMutation,
    signOut,
    currentUser: data,
    currentUserId: data?._id ?? '',
  };
};
