import { Common } from '../../typings/common';
import { Api } from '../../typings/marketplace/api';
import { api } from './api';

export const requestCreators = async () => {
  return api.get('/creators').then((res) => res.data);
};

export const requestProfessionals = async (params?: Api.GetParams['/professionals']) => {
  return api.get('/professionals', params).then((res) => res.data);
};

export const requestUsersByIds = async (ids: Common.Id[]) => {
  return api.get('/users', { ids }).then((res) => res.data);
};
