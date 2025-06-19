import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/globals.css';

const Footer = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleAuthenticatedLink = (path, e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            alert('Faça login para acessar esta página!');
            navigate('/login');
            return;
        }
        navigate(path);
    };

    return (
        <footer className="rodape">
            <div className="container">
                <div className="footer-content">
                    {/* Seção Principal */}
                    <div className="footer-section footer-main">
                        <div className="footer-logo">
                            <h3>ReVeste</h3>
                            <p>Transformando moda em sustentabilidade</p>
                        </div>
                        <p className="footer-description">
                            Faça parte da comunidade ReVeste! Um espaço para doar e trocar roupas, 
                            promovendo o consumo consciente e estendendo a vida útil de cada peça. Moda com propósito.
                        </p>
                        <div className="footer-social">
                            <h4>Siga-nos</h4>
                            <div className="social-links">
                                <a href="#" aria-label="Instagram">📷</a>
                                <a href="#" aria-label="Facebook">📘</a>
                                <a href="#" aria-label="Twitter">🐦</a>
                                <a href="#" aria-label="TikTok">🎵</a>
                            </div>
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div className="footer-section">
                        <h4>Links Rápidos</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Início</Link></li>
                            <li>
                                <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/feminino', e)}>
                                    Moda Feminina
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/masculino', e)}>
                                    Moda Masculina
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/infantil', e)}>
                                    Moda Infantil
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleAuthenticatedLink('/publicar', e)}>
                                    Publicar Item
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Categorias */}
                    <div className="footer-section">
                        <h4>Categorias</h4>
                        <ul className="footer-links">
                            <li>
                                <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/vestidos', e)}>
                                    Vestidos
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/casacos', e)}>
                                    Casacos
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/calcados', e)}>
                                    Calçados
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/inverno', e)}>
                                    Roupas de Inverno
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/verao', e)}>
                                    Roupas de Verão
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/jaquetas', e)}>
                                    Jaquetas
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Suporte */}
                    <div className="footer-section">
                        <h4>Suporte</h4>
                        <ul className="footer-links">
                            <li><a href="#ajuda">Central de Ajuda</a></li>
                            <li><a href="#como-funciona">Como Funciona</a></li>
                            <li><a href="#seguranca">Dicas de Segurança</a></li>
                            <li><a href="#contato">Fale Conosco</a></li>
                            <li><a href="#termos">Termos de Uso</a></li>
                            <li><a href="#privacidade">Política de Privacidade</a></li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div className="footer-section">
                        <h4>Contato</h4>
                        <div className="footer-contact">
                            <p>📧 RevesteBrasil@gmail.com.br</p>
                            <p>📱 (48) 99999-9999</p>
                            <p>📍 Florianópolis, SC - Brasil</p>
                        </div>
                        <div className="footer-stats">
                            <p><strong>+10.000</strong> usuários</p>
                            <p><strong>+50.000</strong> peças publicadas</p>
                            <p><strong>+25.000</strong> trocas realizadas</p>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>&copy; 2025 ReVeste - Todos os direitos reservados.</p>
                        <div className="footer-bottom-links">
                            <a href="#termos">Termos</a>
                            <span>•</span>
                            <a href="#privacidade">Privacidade</a>
                            <span>•</span>
                            <a href="#cookies">Cookies</a>
                        </div>
                    </div>
                    <p className="footer-sustainability">
                        🌱 Juntos por um consumo mais consciente e sustentável
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;