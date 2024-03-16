import { Api } from '../typings/api';
import { Common } from '../typings/common';
import { api } from './api';

export const getUnverifiedUsers = async (params: Api.GetParams['/unverified-users']) => {
  return api.get('/unverified-users', params).then((res) => res.data);
};

export const getRejectedUsers = async (params: Api.GetParams['/rejected-users']) => {
  return api.get('/rejected-users', params).then((res) => res.data);
};

export const acceptUserVerification = async (id: Common.Id) => {
  return api.post(`/unverified-users/${id}/accept`, {}).then((res) => res.data);
};

export const rejectUserVerification = async ([id, data]: [Common.Id, Api.PostPayload['/unverified-users/:id/reject']]) => {
  return api.post(`/unverified-users/${id}/reject`, data).then((res) => res.data);
};

export const resendActivationLink = async (id: Common.Id) => {
  return api.post(`/unverified-users/${id}/resend-activation-link`, {}).then((res) => res.data);
};

export const getCreators = async (params: Api.GetParams['/creators']) => {
  return api.get('/creators', params).then((res) => res.data);
};
