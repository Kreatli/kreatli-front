import { Progress } from '@heroui/react';
import React from 'react';

import { TASK_COLOR_BY_TYPE, TASK_ICON_BY_TYPE } from '../../../../constants/marketplace/tasks';
import { Tasks } from '../../../../typings/marketplace/tasks';
import { Icon } from '../../../various/Icon';

interface Props extends Tasks.Task {}

export const DashboardTask = ({ type, label, value, maxValue, points }: Props) => {
  const shouldShowProgress = value > 0;
  const color = TASK_COLOR_BY_TYPE[type];
  const icon = TASK_ICON_BY_TYPE[type];

  return (
    <div className="flex flex-col shrink-0 border-1 border-default-200 rounded-large overflow-hidden">
      <div className="flex-1 relative p-2">
        <div className="flex gap-3 items-center max-sm:flex-wrap max-sm:justify-between">
          <div className={`w-8 h-8 rounded-medium bg-${color}-50 text-${color}-500 flex justify-center items-center`}>
            <Icon icon={icon} />
          </div>
          <div className="flex-1 text-sm font-semibold max-sm:basis-full max-sm:w-min max-sm:order-1">{label}</div>
          <div className="py-1 px-2 text-xs font-semibold text-default-500 bg-default-100 rounded-small self-start">
            {points} points
          </div>
        </div>
        {shouldShowProgress && (
          <div className="h-1">
            <div className="absolute bottom-0 right-2 flex gap-1 text-xs font-semibold text-default-500">
              <Icon icon="check" size={16} />
              {value}/{maxValue}
            </div>
          </div>
        )}
      </div>
      {shouldShowProgress && (
        <div>
          <Progress size="sm" value={value} maxValue={maxValue} color={color} />
        </div>
      )}
    </div>
  );
};
