import { Api } from '../typings/api';
import { Common } from '../typings/common';
import { api } from './api';

export const requestCurrentCreatorJobs = (params?: Api.GetParams['/creator/job-offers']) => {
  return api.get('/creator/job-offers', params).then((res) => res.data);
};

export const requestCreatorJobs = (id: Common.Id, params?: Api.GetParams['/creator/:id/job-offers']) => {
  return api.get(`/creator/${id}/job-offers`, params).then((res) => res.data);
};
