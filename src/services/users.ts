import { Common } from '../typings/common';
import { api } from './api';

export const requestCreators = () => {
  return api.get('/creators').then((res) => res.data);
};

export const requestProfessionals = () => {
  return api.get('/professionals').then((res) => res.data);
};

export const requestUsersByIds = (ids: Common.Id[]) => {
  return api.get('/users', { ids }).then((res) => res.data);
};
