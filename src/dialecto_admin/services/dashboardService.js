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

// --- Dialects CRUD ---
export const createDialect = async (data) => {
    try {
        const response = await api.post('/create-dialect', data);
        return response.data;
    } catch (error) {
        console.error("Create dialect error:", error);
        throw error?.response?.data || { error: 'Failed to create dialect.' };
    }
};

export const getDialects = async () => {
    try {
        const response = await api.get('/dialects');
        return response.data;
    } catch (error) {
        console.error("Get dialects error:", error);
        throw error?.response?.data || { error: 'Failed to fetch dialects.' };
    }
};

export const getDialectById = async (id) => {
    try {
        const response = await api.get(`/dialects/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get dialect by id error:", error);
        throw error?.response?.data || { error: 'Failed to fetch dialect.' };
    }
};

export const updateDialect = async (id, data) => {
    try {
        const response = await api.put(`/dialects/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Update dialect error:", error);
        throw error?.response?.data || { error: 'Failed to update dialect.' };
    }
};

export const deleteDialect = async (id) => {
    try {
        const response = await api.delete(`/dialects/${id}`);
        return response.data;
    } catch (error) {
        console.error("Delete dialect error:", error);
        throw error?.response?.data || { error: 'Failed to delete dialect.' };
    }
};

// --- Flagged Words ---
export const getFlaggedWords = async () => {
    try {
        const response = await api.get('/flagged-words');
        return response.data;
    } catch (error) {
        console.error("Get flagged words error:", error);
        throw error?.response?.data || { error: 'Failed to fetch flagged words.' };
    }
};

export const deleteFlaggedWord = async (id) => {
    try {
        const response = await api.delete(`/flagged-words/${id}`);
        return response.data;
    } catch (error) {
        console.error("Delete flagged word error:", error);
        throw error?.response?.data || { error: 'Failed to delete flagged word.' };
    }
}; 
