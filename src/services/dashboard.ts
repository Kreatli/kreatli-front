import { Api } from 'typings/api';

import { api } from './api';

export const requestDashboardData = () => {
  return api.get('/dashboard').then((res) => res.data);
};

export const requestBuyPoints = (data: Api.PostPayload['/buy-points']) => {
  return api.post('/buy-points', data).then((res) => res.data);
};
