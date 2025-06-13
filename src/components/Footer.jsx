import React from 'react';
import '../styles/globals.css'; // <--- CORRIGIDO: Removido o underscore aqui!

const Footer = () => {
    return (
        <footer className="rodape">
            <div className="container">
                <p>&copy; 2025 ReVeste - Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;