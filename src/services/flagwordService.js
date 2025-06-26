import api from "../../axiosInstance";

export const flagWord = async ({ dialect_id, word, reason }) => {
  try {
    const res = await api.post("/flag-content", {
      dialect_id,
      word,
      reason,
    });
    return res.data;
  } catch (error) {
    console.error("Flag Word Error:", error);
    throw error?.response?.data || { error: "Failed to flag word" };
  }
};