import { Api } from '../typings/api';
import { api } from './api';

export const requestImageUpload = (data: Api.PostPayload['/upload/image']) => {
  return api.post('/upload/image', data).then((res) => res.data);
};

export const requestFileUpload = (data: Api.PostPayload['/upload/file']) => {
  return api.post('/upload/file', data).then((res) => res.data);
};
