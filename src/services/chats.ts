import { api } from './api';

export const requestChatRequests = () => {
  return api.get('/chat-requests').then((res) => res.data);
};
