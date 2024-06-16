import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

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
        return response;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }

};

export const fetchExpenses = async (token) => {
    return await api.get('/expenses', {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const addExpense = async (token, expense) => {
    return await api.post('/expenses', expense, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
