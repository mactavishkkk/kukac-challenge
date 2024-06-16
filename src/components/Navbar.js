import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { logout } from '../services/api';

const Navbar = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const userEmail = cookies.get('user_email');

    const handleLogout = () => {
        logout();
        alert('Até mais!');
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-center">
                <span className="text-white mr-4">Bem-vindo!</span>
                <div>
                    {userEmail ? (
                        <>
                            <Link to="/rents" className="text-white hover:text-lime-600 mr-4">Rendas</Link>
                            <Link to="/expenses" className="text-white hover:text-red-600 mr-4">Despesas</Link>
                            <span className="text-white mr-4">{userEmail}</span>
                            <button onClick={handleLogout} className="text-white hover:text-sky-700">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white mr-4">Login</Link>
                            <Link to="/register" className="text-white">Cadastre-se</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
