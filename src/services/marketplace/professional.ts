import { Api } from '../../typings/marketplace/api';
import { Common } from '../../typings/common';
import { api } from './api';

export const requestCurrentProfessionalJobs = async (params?: Api.GetParams['/professional/job-applications']) => {
  return api.get('/professional/job-applications', params).then((res) => res.data);
};

export const requestProfessionalJobs = async (id: Common.Id) => {
  return api.get(`/professional/${id}/job-applications`).then((res) => res.data);
};
