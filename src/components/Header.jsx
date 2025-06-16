import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/globals.css';

const Header = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <header className="cabecalho">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src="/img/image (16).png" alt="Ícone de cabide" />
                        <h1>ReVeste</h1>
                    </Link>
                </div>
                <nav className="menu_principal">
                    <ul>
                        {isAuthenticated && (
                            <>
                                <li>
                                    <Link to="/favoritos" aria-label="Favoritos" className="menu-icon-link">
                                        {/* CORAÇÃO USANDO SVG AO INVÉS DE IMAGEM */}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                                        </svg>
                                    </Link>
                                </li>
                                <li><Link to="/chat">Chat</Link></li>
                                <li>
                                    <Link to="/publicar" className="btn-publicar">Publicar Item</Link>
                                </li>
                                <li>
                                    <Link to="/perfil" className="menu_usuario">
                                        <span>{user ? user.nome : "Perfil"}</span>
                                        <img src="/img/fotoperfil.jpeg" alt={user ? user.nome : "Foto de Perfil"} />
                                    </Link>
                                </li>
                            </>
                        )}
                        {!isAuthenticated && (
                            <li>
                                <Link to="/login" className="btn-publicar">Entrar</Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;