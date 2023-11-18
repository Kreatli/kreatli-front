import { api } from './api';

export const requestDashboardData = () => {
  return api.get('/dashboard').then((res) => res.data);
};
