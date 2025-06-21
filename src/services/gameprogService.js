import api from "../../axiosInstance";

export const upsertProgress = async ({ gameType, score, details }) => {
  try {
    const res = await api.post('/progress', {
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