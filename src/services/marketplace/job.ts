import { Api } from '../../typings/marketplace/api';
import { Common } from '../../typings/common';
import { api } from './api';

export const requestJobOfferCreation = async (data: Api.PostPayload['/job-offer']) => {
  return api.post('/job-offer', data).then((res) => res.data);
};

export const requestJobOffer = async (id: Common.Id) => {
  return api.get(`/job-offer/${id}`).then((res) => res.data);
};

export const requestJobOfferOthers = async (id: Common.Id) => {
  return api.get(`/job-offer/${id}/others`).then((res) => res.data);
};

export const requestJobOfferCancel = async (offerId: Common.Id) => {
  return api.post(`/job-offer/${offerId}/cancel`, {}).then((res) => res.data);
};

export const requestJobOfferComplete = async ([offerId, data]: [
  Common.Id,
  Api.PostPayload['/job-offer/:id/complete'],
]) => {
  return api.post(`/job-offer/${offerId}/complete`, data).then((res) => res.data);
};

export const requestJobOfferReview = async ([offerId, data]: [Common.Id, Api.PostPayload['/job-offer/:id/review']]) => {
  return api.post(`/job-offer/${offerId}/review`, data).then((res) => res.data);
};

export const requestJobApplicationCreation = async ([id, data]: [
  Common.Id,
  Api.PostPayload['/job-offer/:id/application'],
]) => {
  return api.post(`/job-offer/${id}/application`, data).then((res) => res.data);
};

export const requestJobApplicationReject = async ([offerId, applicationId]: [Common.Id, Common.Id]) => {
  return api.post(`/job-offer/${offerId}/application/${applicationId}/reject`, {}).then((res) => res.data);
};

export const requestJobApplicationAccept = async ([offerId, applicationId]: [Common.Id, Common.Id]) => {
  return api.post(`/job-offer/${offerId}/application/${applicationId}/accept`, {}).then((res) => res.data);
};

export const requestJobApplicationCancel = async ([offerId, applicationId]: [Common.Id, Common.Id]) => {
  return api.post(`/job-offer/${offerId}/application/${applicationId}/cancel`, {}).then((res) => res.data);
};

export const requestJobOffers = async (params?: Api.GetParams['/job-offers']) => {
  return api.get('/job-offers', params).then((res) => res.data);
};
