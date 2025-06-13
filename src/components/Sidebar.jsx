import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    
    const menuItems = [
        { path: '/', label: 'Início', icon: '🏠' },
        { path: '/perfil', label: 'Perfil', icon: '👤' },
        { path: '/chat', label: 'Chat', icon: '💬' },
        { path: '/favoritos', label: 'Favoritos', icon: '❤️' },
        { path: '/meus-anuncios', label: 'Meus Anúncios', icon: '📝' }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h3>Menu</h3>
            </div>
            <nav className="sidebar-menu">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link 
                                to={item.path} 
                                className={location.pathname === item.path ? 'ativo' : ''}
                            >
                                <span className="sidebar-icon">{item.icon}</span>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;