import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

// AUTH

export const register = async (name, email, password) => {
    return await api.post('/auth/register', { name, email, password });
};

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });

        if (response.status !== 201) {
            throw new Error('Failed to login');
        }

        const token = await response.data.token;
        const userId = await response.data.user.id;
        const userName = await response.data.user.name;

        cookies.set("token", token);
        cookies.set("user_id", userId);
        cookies.set("user_name", userName);
        cookies.set("user_email", email);

        return response;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }

};

export const logout = async () => {
    try {
        cookies.remove("token");
        cookies.remove("user_email");
    } catch (error) {
        console.error('Error logout:', error);
        throw error;
    }
};

export const getUser = async (id) => {
    try {
        const token = cookies.get('token');

        const response = await api.get(`/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

export const updateUser = async (id, updatedUser) => {
    try {
        const token = cookies.get('token');

        const response = await api.put(`/users/${id}`, updatedUser, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};

// EXPENSES

export const getAllExpenses = async () => {
    try {
        const token = cookies.get('token');

        const response = await api.get('/expenses', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

export const getExpenseById = async (id) => {
    try {
        const token = cookies.get('token');

        const response = await api.get(`/expenses/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching expense:', error);
        throw error;
    }
};

export const createExpense = async (expense) => {
    try {
        const token = cookies.get('token');

        const response = await api.post('/expenses', expense, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error;
    }
};

export const updateExpense = async (id, updatedExpense) => {
    try {
        const token = cookies.get('token');

        const response = await api.put(`/expenses/${id}`, updatedExpense, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteExpense = async (id) => {
    try {
        const token = cookies.get('token');

        const response = await api.delete(`/expenses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};

// RENTS

export const getAllRents = async () => {
    try {
        const token = cookies.get('token');

        const response = await api.get('/rents', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching rents:', error);
        throw error;
    }
};

export const getRentById = async (id) => {
    try {
        const token = cookies.get('token');

        const response = await api.get(`/rents/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching rent:', error);
        throw error;
    }
};

export const createRent = async (expense) => {
    try {
        const token = cookies.get('token');

        const response = await api.post('/rents', expense, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching rents:', error);
        throw error;
    }
};

export const updateRent = async (id, updatedExpense) => {
    try {
        const token = cookies.get('token');

        const response = await api.put(`/rents/${id}`, updatedExpense, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteRent = async (id) => {
    try {
        const token = cookies.get('token');

        const response = await api.delete(`/rents/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
};