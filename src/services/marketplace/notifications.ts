import { api } from './api';
import { Notifications } from '../../typings/marketplace/notifications';

export const notificationService = {
  async getNotifications(): Promise<Notifications.Notification[]> {
    const response = await api.get('/notifications');
    return response.data.notifications;
  },

  async getUnreadCount(): Promise<number> {
    const response = await api.get('/notifications');
    return response.data.unreadNotificationsCount;
  },

  async markAsRead(id: string): Promise<void> {
    await api.put('/notification/:id', { isRead: true }, { params: { id } });
  },

  async markAllAsRead(): Promise<void> {
    await api.post('/notifications/mark-all-read', {});
  },

  async deleteNotification(id: string): Promise<void> {
    await api.delete('/notification/:id', { params: { id } });
  },

  async deleteAllNotifications(): Promise<void> {
    await api.delete('/notifications');
  },
};

export const requestUnreadMessagesCount = async (): Promise<{ unreadMessagesCount: number }> => {
  const response = await api.get('/notifications/unread-messages-count');
  return response.data;
};
