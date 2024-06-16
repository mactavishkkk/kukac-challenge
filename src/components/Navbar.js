import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-white">Bem-vindo!</Link>
                <div>
                    <Link to="/login" className="text-white mr-4">Login</Link>
                    <Link to="/register" className="text-white">Cadastre-se</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
