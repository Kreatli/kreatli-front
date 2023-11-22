import { Chip } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { TASK_COLOR_BY_TYPE, TASK_ICON_BY_TYPE } from 'constants/tasks';
import { TIER_LABELS } from 'constants/tier';
import React from 'react';
import { Notifications } from 'typings/notifications';

import { NotificationLink } from './NotificationLink';

interface Props {
  notification: Notifications.Notification;
}

export const NotificationContent = ({ notification }: Props) => {
  const { type } = notification;

  const title = React.useMemo(() => {
    if (type === 'task') {
      const { task } = notification;

      return (
        <div className="inline-flex flex-wrap gap-1 items-center">
          You&apos;ve completed a new task
          <Chip
            size="sm"
            variant="flat"
            color={TASK_COLOR_BY_TYPE[task.type]}
            startContent={<Icon icon={TASK_ICON_BY_TYPE[task.type]} size={20} />}
          >
            {task.label}
          </Chip>
        </div>
      );
    }

    if (type === 'invitation') {
      const { user } = notification;

      return `${user.name}  wants to connect with you`;
    }

    if (type === 'tier') {
      const { tier } = notification;

      return `You've achieved a new ${TIER_LABELS[tier]} tier`;
    }

    return '';
  }, [notification, type]);

  const text = React.useMemo(() => {
    if (type === 'task') {
      const { task } = notification;

      // eslint-disable-next-line max-len
      return `Congratulations! You've successfully completed task and you got ${task.points} points. Visit your dashboard to check it out!`;
    }

    if (type === 'invitation') {
      return 'Expand your network by connecting more people';
    }

    if (type === 'tier') {
      return 'Congratulations! All credits have been refilled! Enjoy your perks. Visit your dashboard to discover your new possibilities';
    }

    return '';
  }, [notification, type]);

  return (
    <div className="flex flex-col pr-12">
      <div className="text-small leading-4 font-semibold mb-1">{title}</div>
      <div className="text-xs text-foreground-500">
        {text}
      </div>
      <NotificationLink type={type} />
    </div>
  );
};
