import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { requestCurrentUserTasks } from '../../../services/user';
import { DashboardTasksTracker } from './DashboardTasksTracker';

interface Props {
  maxHeight?: string;
  minHeight?: string;
}

export const DashboardTasks = ({ maxHeight, minHeight }: Props) => {
  const { data, isFetching } = useQuery({
    meta: {
      showErrorNotification: true,
    },
    queryKey: ['userTasks'],
    queryFn: requestCurrentUserTasks,
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
