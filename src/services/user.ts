import { Api } from '../typings/api';
import { Common } from '../typings/common';
import { api } from './api';

export const requestCurrentUser = () => {
  return api.get('/user').then((res) => res.data);
};

export const requestCurrentUserPosts = (params?: Api.GetParams['/user/posts']) => {
  return api.get('/user/posts', params).then((res) => res.data);
};

export const requestYoutubeInfoUpdate = () => {
  return api.post('/user/update-youtube-info', {}).then((res) => res.data);
};

export const requestUser = (id: Common.Id) => {
  return api.get(`/user/${id}`).then((res) => res.data);
};

export const requestUserInvitation = ([id, data]: [Common.Id, Api.PostPayload['/user/:id/invitation']]) => {
  return api.post(`/user/${id}/invitation`, data).then((res) => res.data);
};

export const requestUserInvitationAccept = ([id, data]: [Common.Id, Api.PostPayload['/user/:id/invitation/accept']]) => {
  return api.post(`/user/${id}/invitation/accept`, data).then((res) => res.data);
};

export const requestUserInvitationReject = ([id, data]: [Common.Id, Api.PostPayload['/user/:id/invitation/reject']]) => {
  return api.post(`/user/${id}/invitation/reject`, data).then((res) => res.data);
};

export const requestUserConnections = (id: Common.Id, params?: Api.GetParams['/user/:id/connections']) => {
  return api.get(`/user/${id}/connections`, params).then((res) => res.data);
};

export const requestUserPosts = (id: Common.Id, params?: Api.GetParams['/user/:id/posts']) => {
  return api.get(`/user/${id}/posts`, params).then((res) => res.data);
};
