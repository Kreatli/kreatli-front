import { Icon } from 'components/various/Icon';
import React from 'react';
import { useMutation } from 'react-query';
import { requestNotificationUpdate } from 'services/notifications';
import { Notifications } from 'typings/notifications';
import { formatNotificationTime } from 'utils/dates';

import { NotificationAvatar } from './NotificationAvatar';
import { NotificationContent } from './NotificationContent';

interface Props {
  notification: Notifications.Notification;
}

export const Notification = ({ notification }: Props) => {
  const { _id: id, isRead, creationDate } = notification;

  const { mutate } = useMutation(requestNotificationUpdate);

  const handleClick = () => {
    mutate([id, { isRead: !isRead }]);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="group relative flex gap-4 p-4 border-b-1 last:border-none border-default-100 cursor-pointer" onClick={handleClick}>
      <NotificationAvatar notification={notification} />
      <NotificationContent notification={notification} />
      <span className="absolute top-4 right-4 text-xs text-default-400">{formatNotificationTime(creationDate)}</span>
      <div className="absolute top-1/2 right-4 w-4 h-4 rounded-sm hidden group-hover:block border-1 border-default-200">
        {isRead && <Icon icon="check" size={14} className="text-default-400" />}
      </div>
      {isRead && <div className="absolute inset-0 opacity-30 bg-background pointer-events-none" />}
    </div>
  );
};
