import { Api } from '../../typings/marketplace/api';
import { Common } from '../../typings/common';
import { api } from './api';

export const requestCurrentUser = async () => {
  return api.get('/user').then((res) => res.data);
};

export const requestCurrentUserUpdate = async (data: any) => {
  return api.put('/user', data).then((res) => res.data);
};

export const requestCurrentUserPosts = async (params?: Api.GetParams['/user/posts']) => {
  return api.get('/user/posts', params).then((res) => res.data);
};

export const requestCurrentUserTasks = async () => {
  return api.get('/user/tasks').then((res) => res.data);
};

export const requestYoutubeInfoUpdate = async () => {
  return api.post('/user/update-youtube-info', {}).then((res) => res.data);
};

export const requestUser = async (id: Common.Id) => {
  return api.get(`/user/${id}`).then((res) => res.data);
};

export const requestUserInvitation = async ([id, data]: [Common.Id, Api.PostPayload['/user/:id/invitation']]) => {
  return api.post(`/user/${id}/invitation`, data).then((res) => res.data);
};

export const requestUserInvitationAccept = async ([id, data]: [
  Common.Id,
  Api.PostPayload['/user/:id/invitation/accept'],
]) => {
  return api.post(`/user/${id}/invitation/accept`, data).then((res) => res.data);
};

export const requestUserInvitationReject = async ([id, data]: [
  Common.Id,
  Api.PostPayload['/user/:id/invitation/reject'],
]) => {
  return api.post(`/user/${id}/invitation/reject`, data).then((res) => res.data);
};

export const requestUserConnections = async (id: Common.Id, params?: Api.GetParams['/user/:id/connections']) => {
  return api.get(`/user/${id}/connections`, params).then((res) => res.data);
};

export const requestUserPosts = async (id: Common.Id, params?: Api.GetParams['/user/:id/posts']) => {
  return api.get(`/user/${id}/posts`, params).then((res) => res.data);
};
