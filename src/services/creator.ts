import { api } from './api';

export const requestCreatorJobOffers = () => {
  return api.get('/creator/job-offers').then((res) => res.data);
};
