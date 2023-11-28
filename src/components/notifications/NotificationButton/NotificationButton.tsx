import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { useSocket } from 'hooks/useSocket';
import React from 'react';
import { requestNotifications } from 'services/notifications';
import { Notifications as NotificationsI } from 'typings/notifications';

import { Notifications } from '../Notifications';

export const NotificationButton = () => {
  const socketRef = useSocket('/notifications-server');
  const [notifications, setNotifications] = React.useState<NotificationsI.Notification[]>([]);

  React.useEffect(() => {
    requestNotifications()
      .then((data) => {
        setNotifications(data.notifications);
      });
  }, []);

  React.useEffect(() => {
    const socket = socketRef.current;

    if (!socket) {
      return;
    }

    socket.on('notification', (notification: NotificationsI.Notification) => {
      setNotifications((currentNotifications) => [notification, ...currentNotifications]);
    });

    socket.on('notificationUpdate', (updatedNotification: NotificationsI.Notification) => {
      setNotifications((prevNotifications) => {
        return prevNotifications.map((notification) => (notification._id === updatedNotification._id
          ? updatedNotification
          : notification));
      });
    });

    return () => {
      socket.off('notification');
      socket.off('notificationUpdate');
    };
  }, [socketRef]);

  const unreadMessagesCount = React.useMemo(() => {
    return notifications.reduce((acc, notification) => (notification.isRead ? acc : acc + 1), 0);
  }, [notifications]);

  return (
    <Popover shouldBlockScroll>
      <PopoverTrigger>
        <Button
          isIconOnly
          aria-label="Toggle notifications menu"
          variant="light"
          className="text-foreground"
          radius="full"
        >
          <Badge size="sm" isInvisible={unreadMessagesCount === 0} content={unreadMessagesCount} color="danger">
            <Icon icon="bell" size={20} />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 overflow-hidden">
        <Notifications notifications={notifications} />
      </PopoverContent>
    </Popover>
  );
};
