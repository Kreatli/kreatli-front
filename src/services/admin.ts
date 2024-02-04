import { Api } from '../typings/api';
import { Common } from '../typings/common';
import { api } from './api';

export const getUnverifiedUsers = async () => {
  return api.get('/unverified-users').then((res) => res.data);
};

export const acceptUserVerification = async (id: Common.Id) => {
  return api.post(`/unverified-users/${id}/accept`, {}).then((res) => res.data);
};

export const rejectUserVerification = async ([id, data]: [Common.Id, Api.PostPayload['/unverified-users/:id/reject']]) => {
  return api.post(`/unverified-users/${id}/reject`, data).then((res) => res.data);
};
