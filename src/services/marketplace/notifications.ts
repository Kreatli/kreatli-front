import { Common } from '../../typings/common';
import { Api } from '../../typings/marketplace/api';
import { api } from './api';

export const requestNotifications = async (params?: Api.GetParams['/notifications']) => {
  return api.get('/notifications', params).then((res) => res.data);
};

export const requestNotificationUpdate = async ([notificationId, data]: [
  Common.Id,
  Api.PutPayload['/notification/:id'],
]) => {
  return api.put(`/notification/${notificationId}`, data).then((res) => res.data);
};

export const requestNotificationsMarkAsRead = async () => {
  return api.post('/notifications/mark-all-read', {}).then((res) => res.data);
};

export const requestUnreadMessagesCount = async () => {
  return api.get('/notifications/unread-messages-count').then((res) => res.data);
};
