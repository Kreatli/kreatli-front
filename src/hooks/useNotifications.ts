import { useCallback, useEffect, useState } from 'react';
import { Notifications } from '../typings/marketplace/notifications';
import { notificationService } from '@/services/marketplace/notifications';
import { useSocket } from './useSocket';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notifications.Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const socket = useSocket();

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await notificationService.getNotifications();
      setNotifications(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch notifications'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId ? { ...notification, isRead: true } : notification,
        ),
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to mark notification as read'));
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to mark all notifications as read'));
    }
  }, []);

  const deleteNotification = useCallback(async (notificationId: string) => {
    try {
      await notificationService.deleteNotification(notificationId);
      setNotifications((prev) => prev.filter((notification) => notification._id !== notificationId));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete notification'));
    }
  }, []);

  const deleteAllNotifications = useCallback(async () => {
    try {
      await notificationService.deleteAllNotifications();
      setNotifications([]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete all notifications'));
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    if (socket) {
      socket.on('notification', (notification: Notifications.Notification) => {
        setNotifications((prev) => [notification, ...prev]);
      });

      socket.on('notification:deleted', (notificationId: string) => {
        setNotifications((prev) => prev.filter((notification) => notification._id !== notificationId));
      });

      socket.on('notification:read', (notificationId: string) => {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === notificationId ? { ...notification, isRead: true } : notification,
          ),
        );
      });
    }

    return () => {
      if (socket) {
        socket.off('notification');
        socket.off('notification:deleted');
        socket.off('notification:read');
      }
    };
  }, [socket, fetchNotifications]);

  return {
    notifications,
    isLoading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
    refreshNotifications: fetchNotifications,
  };
};
