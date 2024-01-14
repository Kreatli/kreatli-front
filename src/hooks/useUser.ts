import { useQuery } from 'react-query';

import { requestUser } from '../services/user';
import { Common } from '../typings/common';
import { User } from '../typings/user';
import { getErrorMessage } from '../utils/getErrorMessage';
import { useNotifications } from './useNotifications';

export const useUser = <T extends User.Type = User.Type>(userId: Common.MaybeId, refetch = false) => {
  const { pushNotification } = useNotifications();

  const fetchUser = () => {
    if (userId) {
      return requestUser(userId);
    }

    return undefined;
  };

  const { data } = useQuery(['user', userId], fetchUser, {
    refetchOnMount: refetch,
    onError: (error) => {
      if (refetch) {
        pushNotification({
          message: getErrorMessage(error),
          color: 'danger',
          icon: 'error',
        });
      }
    },
  });

  return {
    user: data as T | undefined,
  };
};
