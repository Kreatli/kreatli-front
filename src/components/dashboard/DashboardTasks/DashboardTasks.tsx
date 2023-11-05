import React from 'react';
import { Tasks } from 'typings/tasks';

import { DashboardTasksTracker } from './DashboardTasksTracker';

const IN_PROGRESS_TASKS: Tasks.Task[] = [
  {
    type: 'write',
    label: 'Writing 5 posts',
    points: 5,
    value: 3,
    maxValue: 5,
  },
  {
    type: 'send',
    label: '10 connection requests to Creator',
    points: 100,
    value: 1,
    maxValue: 10,
  },
  {
    type: 'grow',
    label: 'Logging on to Kreatli 4 days in a row',
    points: 4,
    value: 2,
    maxValue: 4,
  },
  {
    type: 'engage',
    label: 'Sending your first chat message',
    points: 5,
    value: 3,
    maxValue: 5,
  },
  {
    type: 'like',
    label: 'Referring a friend to join Kreatli',
    points: 30,
    value: 2,
    maxValue: 4,
  },
  {
    type: 'engage',
    label: 'Receiving a first feedback',
    points: 15,
    value: 3,
    maxValue: 5,
  },
  {
    type: 'write',
    label: 'Writing 5 posts',
    points: 5,
    value: 3,
    maxValue: 5,
  },
  {
    type: 'send',
    label: '10 connection requests to Creator',
    points: 100,
    value: 1,
    maxValue: 10,
  },
  {
    type: 'grow',
    label: 'Logging on to Kreatli 4 days in a row',
    points: 4,
    value: 2,
    maxValue: 4,
  },
  {
    type: 'engage',
    label: 'Sending your first chat message',
    points: 5,
    value: 3,
    maxValue: 5,
  },
  {
    type: 'like',
    label: 'Referring a friend to join Kreatli',
    points: 30,
    value: 2,
    maxValue: 4,
  },
  {
    type: 'engage',
    label: 'Receiving a first feedback',
    points: 15,
    value: 3,
    maxValue: 5,
  },
];

const TO_DO_TASKS: Tasks.Task[] = [
  {
    type: 'send',
    label: 'First Professional connection request',
    points: 5,
    value: 0,
    maxValue: 5,
  },
  {
    type: 'engage',
    label: 'Receiving a first feedback',
    points: 100,
    value: 0,
    maxValue: 10,
  },
  {
    type: 'write',
    label: 'Writing 25 posts',
    points: 4,
    value: 0,
    maxValue: 4,
  },
  {
    type: 'grow',
    label: 'Referring a friend to Join Kreatli',
    points: 5,
    value: 0,
    maxValue: 5,
  },
  {
    type: 'engage',
    label: 'Receiving a first like',
    points: 30,
    value: 0,
    maxValue: 4,
  },
  {
    type: 'write',
    label: 'Writing 100 posts',
    points: 15,
    value: 0,
    maxValue: 5,
  },
  {
    type: 'send',
    label: 'First Professional connection request',
    points: 5,
    value: 0,
    maxValue: 5,
  },
  {
    type: 'engage',
    label: 'Receiving a first feedback',
    points: 100,
    value: 0,
    maxValue: 10,
  },
  {
    type: 'write',
    label: 'Writing 25 posts',
    points: 4,
    value: 0,
    maxValue: 4,
  },
  {
    type: 'grow',
    label: 'Referring a friend to Join Kreatli',
    points: 5,
    value: 0,
    maxValue: 5,
  },
  {
    type: 'engage',
    label: 'Receiving a first like',
    points: 30,
    value: 0,
    maxValue: 4,
  },
  {
    type: 'write',
    label: 'Writing 100 posts',
    points: 15,
    value: 0,
    maxValue: 5,
  },
];

interface Props {
  maxHeight?: string;
  minHeight?: string;
}

export const DashboardTasks = ({ maxHeight, minHeight }: Props) => {
  return (
    <div className="flex max-sm:flex-col gap-5">
      <DashboardTasksTracker minHeight={minHeight} maxHeight={maxHeight} label="Task tracker" tasks={IN_PROGRESS_TASKS} />
      <DashboardTasksTracker minHeight={minHeight} maxHeight={maxHeight} label="New tasks" tasks={TO_DO_TASKS} />
    </div>
  );
};
