import api from "../../axiosInstance";

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    throw error?.response?.data || { error: 'Login failed. Please try again.' };
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/user');
    console.log("Current user data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get current user error:", error);
    throw error?.response?.data || { error: 'Failed to fetch user info.' };
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    throw error?.response?.data || { error: 'Logout failed. Please try again.' };
  }
};

export const addUser = async (userData) => {
  try {
    const response = await api.post('/addUser', userData);
    return response.data;
  } catch (error) {
    console.log("Add user error:", error);
    throw error?.response?.data || { error: 'Failed to add user.' };
  }
};

export const getAllUser = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error("Get all users error:", error);
    throw error?.response?.data || { error: 'Failed to fetch users.' };
  }
}