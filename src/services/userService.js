import api from '../../axiosInstance';

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    throw error?.response?.data || { error: 'Login failed. Please try again.' };
    console.error("Login error:", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    throw error?.response?.data || { error: 'Failed to fetch user info.' };
    console.error("Get current user error:", error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    throw error?.response?.data || { error: 'Logout failed. Please try again.' };
    console.error("Logout error:", error);
  }
};

export const addUser = async (userData) => {
  try {
    const response = await api.post('/addUser', userData);
    return response.data;
  } catch (error) {
    throw error?.response?.data || { error: 'Failed to add user.' };
  }
};