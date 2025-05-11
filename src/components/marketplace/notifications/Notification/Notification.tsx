import { useMutation } from '@tanstack/react-query';
import React from 'react';

import { notificationService } from '../../../../services/marketplace/notifications';
import { Notifications } from '../../../../typings/marketplace/notifications';
import { formatNotificationTime } from '../../../../utils/dates';
import { Icon } from '../../../various/Icon';
import { NotificationAvatar } from './NotificationAvatar';
import { NotificationContent } from './NotificationContent';

interface Props {
  notification: Notifications.Notification;
  isDisabled: boolean;
}

export const Notification = ({ notification, isDisabled = false }: Props) => {
  const { _id: id, isRead, createdAt } = notification;
  const { mutate } = useMutation({
    mutationFn: notificationService.markAsRead,
  });

  const handleClick = () => {
    if (isDisabled) {
      return;
    }

    mutate(id);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="group relative flex gap-4 p-4 border-b-1 last:border-none border-default-100 cursor-pointer"
      onClick={handleClick}
    >
      <NotificationAvatar notification={notification} />
      <NotificationContent notification={notification} />
      <span className="absolute top-4 right-4 text-xs text-default-400">{formatNotificationTime(createdAt)}</span>
      <div className="absolute top-1/2 right-4 w-4 h-4 rounded-sm hidden group-hover:block border-1 border-default-200">
        {isRead && <Icon icon="check" size={14} className="text-default-400" />}
      </div>
      {isRead && <div className="absolute inset-0 opacity-30 bg-background pointer-events-none" />}
    </div>
  );
};
