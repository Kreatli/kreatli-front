import { Api } from '../../typings/marketplace/api';
import { api } from './api';

export const requestImageUpload = async (data: Api.PostPayload['/upload/image']) => {
  return api.post('/upload/image', data).then((res) => res.data);
};

export const requestFileUpload = async (data: Api.PostPayload['/upload/file']) => {
  return api.post('/upload/file', data).then((res) => res.data);
};
