import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/expenses', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3001/expenses', { name, value, date }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setExpenses([...expenses, response.data]);
            setName('');
            setValue('');
            setDate('');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <form onSubmit={handleAddExpense} className="max-w-sm mx-auto mt-10 p-4 bg-white shadow-md rounded">
                <h2 className="text-2xl mb-4">Add Expense</h2>
                <div className="mb-4">
                    <label className="block mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Value</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Expense</button>
            </form>
            <div className="mt-10">
                <h2 className="text-2xl mb-4">Expenses</h2>
                <ul>
                    {expenses.map((expense) => (
                        <li key={expense.id} className="mb-2 p-2 bg-gray-100 rounded">
                            <span>{expense.name} - ${expense.value} - {new Date(expense.date).toLocaleDateString()}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Expenses;
