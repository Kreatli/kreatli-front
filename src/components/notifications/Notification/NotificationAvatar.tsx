import { Avatar, Badge } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { TierImage } from 'components/various/TierImage';
import React from 'react';
import { Notifications } from 'typings/notifications';

interface Props {
  notification: Notifications.Notification;
}

export const NotificationAvatar = ({ notification }: Props) => {
  const { type, isRead } = notification;

  const getAvatar = () => {
    if (type === 'task') {
      return (
        <div className="flex w-8 h-8 items-center justify-center text-secondary border-1 rounded-full border-foreground-200">
          <Icon icon="logo" size={20} />
        </div>
      );
    }

    if (type === 'invitation') {
      const { user } = notification;

      return <Avatar className="w-8 h-8" src={user.avatarUrl} />;
    }

    if (type === 'tier') {
      const { tier } = notification;

      return (
        <div className="w-8 h-8">
          <TierImage tier={tier} className="w-8 h-8" />
        </div>
      );
    }

    return null;
  };

  return (
    <Badge size="sm" content="" isInvisible={isRead} color="danger">
      {getAvatar()}
    </Badge>
  );
};
