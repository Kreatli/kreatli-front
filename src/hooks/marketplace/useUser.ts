import { useQuery } from '@tanstack/react-query';

import { requestUser } from '../../services/marketplace/user';
import { Common } from '../../typings/common';
import { User } from '../../typings/marketplace/user';

export const useUser = <T extends User.Type = User.Type>(userId: Common.MaybeId, refetch = false) => {
  const fetchUser = () => {
    if (userId) {
      return requestUser(userId);
    }

    return undefined;
  };

  const { data } = useQuery({
    meta: {
      showErrorNotification: refetch,
    },
    queryKey: ['user', userId],
    queryFn: fetchUser,
    refetchOnMount: refetch,
  });

  return {
    user: data as T | undefined,
  };
};
