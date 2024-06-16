import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../components/AlertErrors';

const Register = ({ history }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await register(name, email, password);

            if (response.status === 201) {
                alert('Cadastro efetuado com sucesso!');
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-10 p-4 bg-white shadow-md rounded">
                <AlertModal message={error} />
                <h2 className="text-2xl mb-4">Cadastre-se</h2>
                <div className="mb-4">
                    <label className="block mb-1 text-left">Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder='Nome e Sobrenome'
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-left">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder='example@email.com'
                        required
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
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 hover:bg-sky-700 text-white p-2 rounded">Cadastrar</button>
            </form>
        </div>
    );
};

export default Register;
