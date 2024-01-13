import React from 'react';

import { Notifications } from '../../../typings/notifications';
import { NotificationLink } from './NotificationLink';
import { NotificationText } from './NotificationText';
import { NotificationTitle } from './NotificationTitle';

interface Props {
  notification: Notifications.Notification;
}

export const NotificationContent = ({ notification }: Props) => {
  return (
    <div className="flex flex-col pr-12">
      <NotificationTitle notification={notification} />
      <div className="text-xs text-foreground-500">
        <NotificationText notification={notification} />
      </div>
      <NotificationLink notification={notification} />
    </div>
  );
};
