import { ProgressProps } from '@nextui-org/react';
import { IconType } from 'components/various/Icon';
import { Tasks } from 'typings/tasks';

export const TASK_ICON_BY_TYPE: Record<Tasks.Type, IconType> = {
  content: 'taskWrite',
  engagement: 'taskEngage',
  job: 'taskSend',
  platform: 'taskGrow',
};

export const TASK_COLOR_BY_TYPE: Record<Tasks.Type, ProgressProps['color']> = {
  content: 'secondary',
  engagement: 'primary',
  job: 'warning',
  platform: 'success',
};
