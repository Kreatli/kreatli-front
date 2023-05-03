import { api } from './api';

export const requestUser = () => {
  return api.get('/user').then((res) => res.data);
};
