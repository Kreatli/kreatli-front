import { Card, CardBody, CardHeader } from '@nextui-org/react';
import React from 'react';

import { Tasks } from '../../../typings/tasks';
import { DashboardTask } from './DashboardTask';
import { DashboardTasksTrackerSkeleton } from './DashboardTasksTrackerSkeleton';

interface Props {
  label: string;
  tasks: Tasks.Task[];
  isLoading?: boolean;
  maxHeight?: string;
  minHeight?: string;
}

export const DashboardTasksTracker = ({ label, isLoading, tasks, maxHeight, minHeight }: Props) => {
  return (
    <Card className="flex-1" style={{ maxHeight, minHeight }}>
      <CardHeader className="p-5 pb-2">
        <div className="text-xs text-default-400 font-semibold">{label}</div>
      </CardHeader>
      <CardBody className="p-5 pt-2">
        <div className="flex sm:flex-col gap-3">
          {isLoading && (
            <DashboardTasksTrackerSkeleton />
          )}
          {!isLoading && (
            <>
              {tasks.map((task, index) => (
                <DashboardTask key={index} {...task} />
              ))}
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
