import { useRouter } from 'next/router';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { requestSignIn } from '../services/auth';
import { requestUser } from '../services/user';

export const useSession = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const signInMutation = useMutation(requestSignIn, {
    onSuccess: ({ token, user }) => {
      localStorage.setItem('token', token);
      queryClient.setQueryData('user', user);
    },
    // add error handler
  });

  const signOut = React.useCallback(() => {
    localStorage.removeItem('token');
    queryClient.setQueryData('user', undefined);
    router.push('/');
  }, [queryClient, router]);

  const { data, isLoading } = useQuery('user', requestUser, {
    refetchOnMount: false,
    onError: () => {
      localStorage.removeItem('token');
    },
  });

  return {
    isSignedIn: !!data,
    isLoading,
    signInMutation,
    signOut,
    user: data,
  };
};
