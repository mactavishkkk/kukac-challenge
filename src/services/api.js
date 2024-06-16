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

        const token = await response.data;

        cookies.set("token", token);
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

// EXPENSES

export const getAllExpenses = async () => {
    try {
        const token = cookies.get('token');

        const response = await api.get('/expenses', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response;
    } catch (error) {
        console.error('Error fetching users:', error);
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
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const updateExpense = async (id, updatedExpense, token) => {
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