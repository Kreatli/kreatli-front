import { Api } from '../../typings/marketplace/api';
import { api } from './api';

export const requestContactFormSubmission = async (data: Api.PostPayload['/contact']) => {
  return api.post('/contact', data).then((res) => res.data);
};
