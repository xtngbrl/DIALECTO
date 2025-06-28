import api from "../../axiosInstance";

export const getUserProgress = async () => {
  try {
    const res = await api.get('/userProgress'); 
    return res.data.data;
  } catch (error) {
    console.error("Error fetching user progress:", error);
    throw error?.response?.data || { error: "Failed to fetch user progress" };
  }
};