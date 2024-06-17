import React, { useState, useEffect } from 'react';
import { getUser, updateUser } from '../services/api';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const cookies = new Cookies();
    const userId = cookies.get('user_id');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUser(userId);

                const userData = response.data;

                setName(userData.name);
                setEmail(userData.email);
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        try {
            await updateUser(userId, { name, email, password });

            alert('Usuário atualizado com sucesso!')
            navigate('/rents');
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="max-w-sm mx-auto mt-10 p-4 bg-white shadow-md rounded">
            <h2 className="text-2xl mb-4">Editar Usuário</h2>
            <div className="mb-4">
                <label className="block mb-1 text-left">Nome</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder='Nome Sobrenome'
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 text-left">Senha</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder='******'
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-sky-700 text-white p-2 rounded">Atualizar</button>
        </form>
    );
};

export default EditUser;
