import { Api } from '../typings/api';
import { api } from './api';

export const requestCurrentProfessionalJobs = (params?: Api.GetParams['/professional/job-applications']) => {
  return api.get('/professional/job-applications').then((res) => res.data);
};

export const requestProfessionalJobs = (params?: Api.GetParams['/professional/:id/job-applications']) => {
  return api.get('/professional/:id/job-applications').then((res) => res.data);
};
