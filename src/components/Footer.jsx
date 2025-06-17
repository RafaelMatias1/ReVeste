import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/globals.css';

const Footer = () => {
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
                            <li><Link to="/categorias/todos">Todos os Produtos</Link></li>
                            <li><Link to="/categorias/feminino">Moda Feminina</Link></li>
                            <li><Link to="/categorias/masculino">Moda Masculina</Link></li>
                            <li><Link to="/categorias/infantil">Moda Infantil</Link></li>
                            <li><Link to="/publicar">Publicar Item</Link></li>
                        </ul>
                    </div>

                    {/* Categorias */}
                    <div className="footer-section">
                        <h4>Categorias</h4>
                        <ul className="footer-links">
                            <li><Link to="/categorias/vestidos">Vestidos</Link></li>
                            <li><Link to="/categorias/casacos">Casacos</Link></li>
                            <li><Link to="/categorias/calcados">Calçados</Link></li>
                            <li><Link to="/categorias/inverno">Roupas de Inverno</Link></li>
                            <li><Link to="/categorias/verao">Roupas de Verão</Link></li>
                            <li><Link to="/categorias/jaquetas">Jaquetas</Link></li>
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