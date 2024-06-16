import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { createExpense, deleteExpense, getAllExpenses } from '../services/api';
import { FiMoreVertical } from 'react-icons/fi';

const Rent = () => {
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [rents, setRents] = useState([]);
    const [showMenu, setShowMenu] = useState(null);

    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');
    const userEmail = cookies.get('user_email');

    const userRents = rents.filter(rent => rent.user.email === userEmail);

    const handleAddRent = async (e) => {
        e.preventDefault();

        try {
            const response = await createExpense({ name, value, date });

            setRents([...rents, response.data]);

            setName('');
            setValue('');
            setDate('');
        } catch (error) {
            console.error('Error adding rent:', error);
        }
    };

    const handleMenuToggle = (id) => {
        setShowMenu(showMenu === id ? null : id);
    };

    const handleDelete = (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
            deleteExpense(id)
                .then(() => {
                    window.location.reload();
                })
                .catch(error => console.error('Erro ao excluir despesa:', error));
        }
    };

    const handleEdit = (id) => {
        // Implement the edit functionality
    };

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            getAllExpenses().then(response => response)
                .then(data => setRents(data.data))
                .catch(error => console.error('Erro ao obter as despesas:', error));
        }
    }, [token]);

    return (
        <div className="container mx-auto">
            <form onSubmit={handleAddRent} className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded">
                <h2 className="text-2xl mb-4">Rendas</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label className="block mb-1 text-left">Nome</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder='Salário'
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-left">Valor</label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder='1043.23'
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-left">Data</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <button type="submit" className="col-span-2 bg-blue-500 hover:bg-sky-700 text-white p-2 rounded">
                        Adicionar Despesa
                    </button>
                </div>
            </form>
            <div className="mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {userRents.map((rent) => (
                        <div key={rent.id} className="relative mb-2 p-4 bg-gray-100 rounded shadow">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">{rent.name}</span>
                                <div className="relative">
                                    <FiMoreVertical className="cursor-pointer" onClick={() => handleMenuToggle(rent.id)} />
                                    {showMenu === rent.id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                                            <button
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                onClick={() => handleEdit(rent.id)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                onClick={() => handleDelete(rent.id)}
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <span className="block text-green-500 text-2xl text-left">{rent.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                            <span className="block text-black text-lg text-right">{new Date(rent.date).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Rent;
