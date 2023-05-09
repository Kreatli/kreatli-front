import { Api } from '../typings/api';
import { api } from './api';

export const requestSignIn = (data: Api.PostPayload['/auth/signin']) => {
  return api.post('/auth/signin', data).then((res) => res.data);
};

export const requestSignUpCreator = (data: Api.PostPayload['/auth/signup-creator']) => {
  return api.post('/auth/signup-creator', data).then((res) => res.data);
};

export const requestSignUpProfessional = (data: Api.PostPayload['/auth/signup-professional']) => {
  return api.post('/auth/signup-professional', data).then((res) => res.data);
};

export const requestUserActivation = (data: Api.PostPayload['/auth/activate']) => {
  return api.post('/auth/activate', data).then((res) => res.data);
};

export const requestResetPassword = (data: Api.PostPayload['/auth/reset-password']) => {
  return api.post('/auth/reset-password', data).then((res) => res.data);
};

export const requestChangePassword = (data: Api.PostPayload['/auth/change-password']) => {
  return api.post('/auth/change-password', data).then((res) => res.data);
};
