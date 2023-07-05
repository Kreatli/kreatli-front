import { Api } from '../typings/api';
import { api } from './api';

export const requestJobOfferCreation = (data: Api.PostPayload['/job-offer']) => {
  return api.post('/job-offer', data).then((res) => res.data);
};

export const requestJobOffers = (params?: Api.GetParams['/job-offers']) => {
  return api.get('/job-offers', params).then((res) => res.data);
};
