import api from "../../../axiosInstance";


export const dashboardGetTotalUsers = async () => {
  try {
    const response = await api.get('/dashboard/total-users');
    return response.data;
  } catch (error) {
    console.error("Get total users error:", error);
    throw error?.response?.data || { error: 'Failed to fetch total users.' };
  }
};

export const dashboardGetActiveUsers = async () => {
    try{
        const response = await api.get('/dashboard/total-active-users');
        return response.data;
    } catch (error) {
        console.error("Get active users error:", error);
        throw error?.response?.data || { error: 'Failed to fetch active users.' };
    }
}

export const dashboardGetTopContributors = async () => {
    try {
        const response = await api.get('/dashboard/top-contributors');
        return response.data;
    } catch (error) {
        console.error("Get top contributors error:", error);
        throw error?.response?.data || { error: 'Failed to fetch top contributors.' };
    }
};

export const dashboardGetRecentlyActiveUsers = async () => {
    try {
        const response = await api.get('/dashboard/recently-active-users');
        return response.data;
    } catch (error) {
        console.error("Get recently active users error:", error);
        throw error?.response?.data || { error: 'Failed to fetch recently active users.' };
    }
};

export const dashboardGetTopStudentsProgressGraph = async () => {
    try {
        const response = await api.get('/dashboard/top-students-progress');
        return response.data;
    } catch (error) {
        console.error("Get top students progress graph error:", error);
        throw error?.response?.data || { error: 'Failed to fetch top students progress graph.' };
    }
}; 
