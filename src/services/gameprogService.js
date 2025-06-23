import api from "../../axiosInstance";

export const upsertProgress = async ({ gameType, score, details }) => {
  try {
    const res = await api.post('/game-progress', {
      gameType,
      score,
      details
    });
    return res.data;
  } catch (error) {
    console.error("Upsert Progress Error:", error);
    throw error?.response?.data || { error: 'Failed to save progress' };
  }
};

export const getProgress = async (userId) => {
  try {
    const res = await api.get(`/game-progress?userId=${userId}`);
    return res.data;
  } catch (error) {
    console.error("Get Progress Error:", error);
    throw error?.response?.data || { error: 'Failed to fetch progress' };
  }
}