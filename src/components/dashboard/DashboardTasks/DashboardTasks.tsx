import React from 'react';
import { useQuery } from 'react-query';

import { useNotifications } from '../../../hooks/useNotifications';
import { requestCurrentUserTasks } from '../../../services/user';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { DashboardTasksTracker } from './DashboardTasksTracker';

interface Props {
  maxHeight?: string;
  minHeight?: string;
}

export const DashboardTasks = ({ maxHeight, minHeight }: Props) => {
  const { pushNotification } = useNotifications();
  const { data, isFetching } = useQuery('userTasks', requestCurrentUserTasks, {
    onError: (error) => {
      pushNotification({
        message: getErrorMessage(error),
        color: 'danger',
        icon: 'error',
      });
    },
  });

  const { ongoingTasks = [], newTasks = [] } = data ?? {};
  const shouldShowSkeleton = (newTasks.length === 0 || ongoingTasks.length === 0) && isFetching;

  return (
    <div className="flex max-sm:flex-col gap-5">
      <DashboardTasksTracker
        isLoading={shouldShowSkeleton}
        minHeight={minHeight}
        maxHeight={maxHeight}
        label="Task tracker"
        tasks={ongoingTasks}
      />
      <DashboardTasksTracker
        isLoading={shouldShowSkeleton}
        minHeight={minHeight}
        maxHeight={maxHeight}
        label="New tasks"
        tasks={newTasks}
      />
    </div>
  );
};
