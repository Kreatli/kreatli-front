import { Api } from '../typings/api';
import { Common } from '../typings/common';
import { api } from './api';

export const requestJobOfferCreation = (data: Api.PostPayload['/job-offer']) => {
  return api.post('/job-offer', data).then((res) => res.data);
};

export const requestJobOffer = (id: Common.Id) => {
  return api.get(`/job-offer/${id}`).then((res) => res.data);
};

export const requestJobOffers = (params?: Api.GetParams['/job-offers']) => {
  return api.get('/job-offers', params).then((res) => res.data);
};
