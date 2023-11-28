import { Api } from 'typings/api';
import { Common } from 'typings/common';

import { api } from './api';

export const requestNotifications = (params?: Api.GetParams['/notifications']) => {
  return api.get('/notifications', params).then((res) => res.data);
};

export const requestNotificationUpdate = ([notificationId, data]: [Common.Id, Api.PutPayload['/notification/:id']]) => {
  return api.put(`/notification/${notificationId}`, data).then((res) => res.data);
};
