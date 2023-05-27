import { Api } from '../typings/api';
import { Common } from '../typings/common';
import { api } from './api';

export const requestUser = () => {
  return api.get('/user').then((res) => res.data);
};

export const requestUserById = (id: Common.Id) => {
  return api.get(`/user/${id}`).then((res) => res.data);
};

export const requestUserInvitation = ([id, data]: [Common.Id, Api.PostPayload['/user/:id/invitation']]) => {
  return api.post(`/user/${id}/invitation`, data).then((res) => res.data);
};

export const requestUserConnections = (id: Common.Id) => {
  return api.get(`/user/${id}/connections`).then((res) => res.data);
};
