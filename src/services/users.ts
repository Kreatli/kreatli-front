import { Api } from '../typings/api';
import { Common } from '../typings/common';
import { api } from './api';

export const requestCreators = () => {
  return api.get('/creators').then((res) => res.data);
};

export const requestProfessionals = (params?: Api.GetParams['/professionals']) => {
  return api.get('/professionals', params).then((res) => res.data);
};

export const requestUsersByIds = (ids: Common.Id[]) => {
  return api.get('/users', { ids }).then((res) => res.data);
};
