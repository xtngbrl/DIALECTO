import api from '../../axiosInstance';

export const getLeaderboard = async (gameType, limit = 50) => {
  try {
    const response = await api.get('/leaderboard', {
      params: { gameType, limit }
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || { error: 'Failed to fetch leaderboard.' };
  }
};
