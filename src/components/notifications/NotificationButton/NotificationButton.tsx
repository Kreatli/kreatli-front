import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { Icon } from 'components/various/Icon';
import { useNotificationsPopoverVisibility } from 'hooks/useNotificationsPopoverVisibility';
import { useSocket } from 'hooks/useSocket';
import React from 'react';
import { requestNotifications } from 'services/notifications';
import { Notifications as NotificationsI } from 'typings/notifications';

import { Notifications } from '../Notifications';

const NOTIFICATIONS_LIMIT = 20;

export const NotificationButton = () => {
  const socketRef = useSocket('/notifications-server');
  const { isOpen, onOpenChange } = useNotificationsPopoverVisibility();
  const [notifications, setNotifications] = React.useState<NotificationsI.Notification[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadInitialNotifications = () => {
    setIsLoading(true);
    setOffset(0);
    requestNotifications({ offset: 0, limit: NOTIFICATIONS_LIMIT })
      .then((data) => {
        setNotifications(data.notifications);
        setTotalCount(data.notificationsCount);
        setUnreadCount(data.unreadNotificationsCount);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadMoreNotifications = () => {
    setIsLoading(true);
    setOffset(offset + NOTIFICATIONS_LIMIT);
    requestNotifications({ offset: offset + NOTIFICATIONS_LIMIT, limit: NOTIFICATIONS_LIMIT })
      .then((data) => {
        setNotifications((currentNotifications) => [...currentNotifications, ...data.notifications]);
        setUnreadCount(data.unreadNotificationsCount);
        setTotalCount(data.notificationsCount);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(loadInitialNotifications, []);

  React.useEffect(() => {
    const socket = socketRef.current;

    if (!socket) {
      return;
    }

    socket.on('notification', (notification: NotificationsI.Notification) => {
      setNotifications((currentNotifications) => [notification, ...currentNotifications]);
      setTotalCount((count) => count + 1);
      setUnreadCount((count) => count + 1);
    });

    socket.on('notificationUpdate', (updatedNotification: NotificationsI.Notification) => {
      setNotifications((prevNotifications) => {
        return prevNotifications.map((notification) => (notification._id === updatedNotification._id
          ? updatedNotification
          : notification));
      });
      setUnreadCount((count) => {
        return updatedNotification.isRead
          ? count - 1
          : count + 1;
      });
    });

    return () => {
      socket.off('notification');
      socket.off('notificationUpdate');
    };
  }, [socketRef]);

  return (
    <Popover isOpen={isOpen} onOpenChange={onOpenChange} shouldBlockScroll>
      <PopoverTrigger>
        <Button
          isIconOnly
          aria-label="Toggle notifications menu"
          variant="light"
          className="text-foreground overflow-visible"
          radius="full"
        >
          <Badge size="sm" shape="circle" isInvisible={unreadCount === 0} content={unreadCount} color="danger">
            <Icon icon="bell" size={20} />
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 overflow-hidden">
        <Notifications
          isLoading={isLoading}
          notifications={notifications}
          totalCount={totalCount}
          unreadCount={unreadCount}
          onReadAll={loadInitialNotifications}
          onLoadMore={loadMoreNotifications}
        />
      </PopoverContent>
    </Popover>
  );
};
