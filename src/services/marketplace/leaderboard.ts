import { api } from './api';

export const requestLeaderboardUsers = async () => {
  return api.get('/leaderboard').then((res) => res.data);
};
