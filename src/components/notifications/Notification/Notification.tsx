import React from 'react';
import { Notifications } from 'typings/notifications';
import { formatNotificationTime } from 'utils/dates';

import { NotificationAvatar } from './NotificationAvatar';
import { NotificationContent } from './NotificationContent';

interface Props {
  notification: Notifications.Notification;
}

export const Notification = ({ notification }: Props) => {
  const { isRead } = notification;

  return (
    <div className="relative flex gap-4 p-4 border-b-1 last:border-none border-default-100">
      <NotificationAvatar notification={notification} />
      <NotificationContent notification={notification} />
      <span className="absolute top-4 right-4 text-xs text-default-400">{formatNotificationTime(notification.creationDate)}</span>
      {isRead && <div className="absolute inset-0 opacity-30 bg-background pointer-events-none" />}
    </div>
  );
};
