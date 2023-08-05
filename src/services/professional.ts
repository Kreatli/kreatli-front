import { api } from './api';

export const requestProfessionalJobApplications = () => {
  return api.get('/professional/job-applications').then((res) => res.data);
};
