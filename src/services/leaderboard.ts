import { api } from './api';

export const requestLeaderboardUsers = () => {
  return api.get('/leaderboard').then((res) => res.data);
};
