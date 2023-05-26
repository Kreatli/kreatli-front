import { useQuery } from 'react-query';

import { requestUserById } from '../services/user';
import { User } from '../typings/user';

export const useUser = <T extends User.Type = User.Type>(userId: string | undefined, refetch = false) => {
  const fetchUser = () => {
    if (userId) {
      return requestUserById(userId);
    }

    return undefined;
  };

  const { data } = useQuery(['user', userId], fetchUser, {
    refetchOnMount: refetch,
    onError: () => {
      // TODO: show error notification
    },
  });

  return {
    user: data as T | undefined,
  };
};
