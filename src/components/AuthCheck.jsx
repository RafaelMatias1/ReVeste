// src/components/AuthCheck.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCheck = ({ children, requireAuth = true, redirectTo = '/login' }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (requireAuth && !isAuthenticated) {
            e.preventDefault();
            e.stopPropagation();
            alert('Faça login para acessar esta funcionalidade!');
            navigate(redirectTo);
            return false;
        }
    };

    return (
        <div onClick={handleClick} style={{ cursor: requireAuth && !isAuthenticated ? 'pointer' : 'inherit' }}>
            {children}
        </div>
    );
};

export default AuthCheck;