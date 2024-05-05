/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import React from 'react';
import { Socket } from 'socket.io-client';

import { useNotificationsPopoverVisibility } from '../../../hooks/useNotificationsPopoverVisibility';
import { requestNotifications } from '../../../services/notifications';
import { Notifications as NotificationsI } from '../../../typings/notifications';
import { Icon } from '../../various/Icon';
import { Notifications } from '../Notifications';

const NOTIFICATIONS_LIMIT = 20;

interface Props {
  socket: Socket | null;
}

export const NotificationButton = ({ socket }: Props) => {
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
        return prevNotifications.map((notification) =>
          notification._id === updatedNotification._id ? updatedNotification : notification,
        );
      });
      setUnreadCount((count) => {
        return updatedNotification.isRead ? count - 1 : count + 1;
      });
    });

    return () => {
      socket.off('notification');
      socket.off('notificationUpdate');
    };
  }, [socket]);

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
