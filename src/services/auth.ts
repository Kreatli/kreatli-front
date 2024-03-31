import { Api } from '../typings/api';
import { api } from './api';

export const requestSignIn = async (data: Api.PostPayload['/auth/signin']) => {
  return api.post('/auth/signin', data).then((res) => res.data);
};

export const requestSignUpCreator = async (
  data: Api.PostPayload['/auth/signup-creator'],
) => {
  return api.post('/auth/signup-creator', data).then((res) => res.data);
};

export const requestSignUpProfessional = async (
  data: Api.PostPayload['/auth/signup-professional'],
) => {
  return api.post('/auth/signup-professional', data).then((res) => res.data);
};

export const requestSsoCreator = async (
  data: Api.PostPayload['/auth/sso-creator'],
) => {
  return api.post('/auth/sso-creator', data).then((res) => res.data);
};

export const requestUserActivation = async (
  data: Api.PostPayload['/auth/activate'],
) => {
  return api.post('/auth/activate', data).then((res) => res.data);
};

export const requestResetPassword = async (
  data: Api.PostPayload['/auth/reset-password'],
) => {
  return api.post('/auth/reset-password', data).then((res) => res.data);
};

export const requestChangePassword = async (
  data: Api.PostPayload['/auth/change-password'],
) => {
  return api.post('/auth/change-password', data).then((res) => res.data);
};
