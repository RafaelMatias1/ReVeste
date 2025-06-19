import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthModal.css';

const AuthModal = ({ isOpen, onClose, message, title = "Login Necessário" }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogin = () => {
        onClose();
        navigate('/login');
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="auth-modal-overlay" onClick={handleCancel}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                <div className="auth-modal-header">
                    <div className="auth-modal-icon">🔒</div>
                    <h3>{title}</h3>
                </div>
                
                <div className="auth-modal-body">
                    <p>{message}</p>
                </div>
                
                <div className="auth-modal-footer">
                    <button 
                        className="auth-modal-btn auth-modal-cancel"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="auth-modal-btn auth-modal-login"
                        onClick={handleLogin}
                    >
                        Fazer Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;