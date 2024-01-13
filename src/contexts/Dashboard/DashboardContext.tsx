import React from 'react';
import { useQuery } from 'react-query';

import { useNotifications } from '../../hooks/useNotifications';
import { useSession } from '../../hooks/useSession';
import { requestDashboardData } from '../../services/dashboard';
import { getErrorMessage } from '../../utils/getErrorMessage';

interface Context {
  earnedToday: number;
  earnedTomorrow: number;
  dailyLimit: number;
  userPoints: number;
  userTier: number;
}

const initialContext = {
  earnedToday: 0,
  earnedTomorrow: 0,
  dailyLimit: 200,
  userPoints: 0,
  userTier: 1,
};

interface Props {
  children: React.ReactNode;
}

export const DashboardContext = React.createContext<Context>(initialContext);

export const DashboardContextProvider = ({ children }: Props) => {
  const { currentUser } = useSession();
  const { pushNotification } = useNotifications();

  const { data } = useQuery('dashboard', requestDashboardData, {
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const {
    earnedToday = 0,
    earnedTomorrow = 0,
    dailyLimit = 200,
    userPoints = currentUser?.tierPoints ?? 0,
    userTier = currentUser?.tier ?? 1,
  } = data ?? {};

  const memoizedValue = React.useMemo(() => ({
    earnedToday,
    earnedTomorrow,
    dailyLimit,
    userPoints,
    userTier,
  }), [dailyLimit, earnedToday, earnedTomorrow, userPoints, userTier]);

  return (
    <DashboardContext.Provider value={memoizedValue}>
      {children}
    </DashboardContext.Provider>
  );
};
