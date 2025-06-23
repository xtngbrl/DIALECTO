import api from "../../axiosInstance";

export const getTotalLeaderboard = async () => {
  try {
    const response = await api.get('/leaderboards');
    return response.data;
  } catch (error) {
    throw error?.response?.data || { error: 'Failed to fetch total leaderboard.' };
  }
};
