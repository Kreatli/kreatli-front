import { api } from './api';

export const requestChatRequests = async () => {
  return api.get('/chat-requests').then((res) => res.data);
};
