import { Api } from '../typings/api';
import { Common } from '../typings/common';
import { api } from './api';

export const requestJobOfferCreation = (data: Api.PostPayload['/job-offer']) => {
  return api.post('/job-offer', data).then((res) => res.data);
};

export const requestJobOffer = (id: Common.Id) => {
  return api.get(`/job-offer/${id}`).then((res) => res.data);
};

export const requestJobOfferOthers = (id: Common.Id) => {
  return api.get(`/job-offer/${id}/others`).then((res) => res.data);
};

export const requestJobApplicationCreation = ([id, data]: [Common.Id, Api.PostPayload['/job-offer/:id/application']]) => {
  return api.post(`/job-offer/${id}/application`, data).then((res) => res.data);
};

export const requestJobApplicationReject = ([offerId, applicationId]: [Common.Id, Common.Id]) => {
  return api.post(`/job-offer/${offerId}/application/${applicationId}/reject`, {}).then((res) => res.data);
};

export const requestJobApplicationAccept = ([offerId, applicationId]: [Common.Id, Common.Id]) => {
  return api.post(`/job-offer/${offerId}/application/${applicationId}/accept`, {}).then((res) => res.data);
};

export const requestJobOffers = (params?: Api.GetParams['/job-offers']) => {
  return api.get('/job-offers', params).then((res) => res.data);
};
