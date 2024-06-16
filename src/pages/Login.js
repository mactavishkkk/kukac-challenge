import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../components/AlertErrors';

const Login = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(email, password);

            if (response.status === 201) {
                alert('Login efetuado com sucesso!');
                navigate('/expenses');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-10 p-4 bg-white shadow-md rounded">
                <AlertModal message={error} />
                <h2 className="text-2xl mb-4">Login</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-left">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder='example@email.com'
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-left">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder='******'
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-sky-700 text-white p-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
