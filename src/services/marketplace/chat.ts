import { Common } from '../../typings/common';
import { Api } from '../../typings/marketplace/api';
import { api } from './api';

export const requestChat = async (participantId: Common.Id) => {
  return api.get(`/chat/${participantId}`).then((res) => res.data);
};

export const requestChatMessages = async (participantId: Common.Id, params?: Api.GetParams['/chat/:id/messages']) => {
  return api.get(`/chat/${participantId}/messages`, params).then((res) => res.data);
};

export const requestChatMessagesRead = async ([participantId, data]: [
  Common.Id,
  Api.PostPayload['/chat/:id/messages/read'],
]) => {
  return api.post(`/chat/${participantId}/messages/read`, data).then((res) => res.data);
};

export const requestChatUpdate = async ([participantId, data]: [Common.Id, Api.PutPayload['/chat/:id']]) => {
  return api.put(`/chat/${participantId}`, data).then((res) => res.data);
};
