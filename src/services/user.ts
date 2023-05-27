import { Api } from '../typings/api';
import { api } from './api';

export const requestUser = () => {
  return api.get('/user/').then((res) => res.data);
};

export const requestUserById = (id: string) => {
  return api.get(`/user/${id}/`).then((res) => res.data);
};

export const requestUserInvitation = ([id, data]: [string, Api.PostPayload['/user/:id/invitation']]) => {
  return api.post(`/user/${id}/invitation`, data).then((res) => res.data);
};

export const requestUserConnections = (id: string) => {
  return api.get(`/user/${id}/connections`).then((res) => res.data);
};
