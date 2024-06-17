import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getExpenseById, updateExpense } from '../services/api';

const EditExpense = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                const response = await getExpenseById(id);

                const expenseData = response.data;

                setName(expenseData.name);
                setValue(expenseData.value);
                setDate(expenseData.date.split('T')[0]);
            } catch (error) {
                console.error('Erro ao carregar dados da despesa:', error);
            }
        };

        fetchExpenseData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        let parseValue = parseFloat(value);
        let parseDate = new Date(date).toISOString();

        try {
            await updateExpense(id, { name, value: parseValue, date: parseDate });
            alert('Despesa atualizado com sucesso!')
            navigate('/expenses')
        } catch (error) {
            console.error('Erro ao atualizar dados da despesa:', error);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="max-w-sm mx-auto mt-10 p-4 bg-white shadow-md rounded">
            <h2 className="text-2xl mb-4">Editar Despesa</h2>
            <div className="mb-4">
                <label className="block mb-1 text-left">Nome</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1 text-left">Valor</label>
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
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
            <button type="submit" className="w-full bg-blue-500 hover:bg-sky-700 text-white p-2 rounded">Atualizar Despesa</button>
        </form>
    );
};

export default EditExpense;
