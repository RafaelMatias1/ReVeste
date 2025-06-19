import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import InfoModal from './InfoModal';
import '../styles/globals.css';

const Footer = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authModalMessage, setAuthModalMessage] = useState('');
    const [showTerms, setShowTerms] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    const handleAuthenticatedLink = (path, categoryName, e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            setAuthModalMessage(`Para explorar a categoria "${categoryName}" e ver todos os produtos disponíveis, você precisa fazer login na sua conta.`);
            setShowAuthModal(true);
            return;
        }
        navigate(path);
    };

    // Função para abrir o chat na categoria correta
    const openChatCategory = (category) => {
        window.location.href = `/chat?categoria=${category}`;
    };

    return (
        <>
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
                            
                            {/* NOVO: Botão Sobre Nós */}
                            <div className="footer-about-button">
                                <Link to="/sobre-nos" className="btn-about-us">
                                    📖 Saiba mais sobre nós
                                </Link>
                            </div>
                            
                            <div className="footer-social">
                                <h4>Siga-nos</h4>
                                <div className="social-links">
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
                                    <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">📘</a>
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">📒</a>
                                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">🎵</a>
                                </div>
                            </div>
                        </div>

                        {/* Links Rápidos */}
                        <div className="footer-section">
                            <h4>Links Rápidos</h4>
                            <ul className="footer-links">
                                <li><Link to="/">Início</Link></li>
                                <li>
                                    <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/feminino', 'Moda Feminina', e)}>
                                        Moda Feminina
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/masculino', 'Moda Masculina', e)}>
                                        Moda Masculina
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/infantil', 'Moda Infantil', e)}>
                                        Moda Infantil
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => {
                                        if (!isAuthenticated) {
                                            e.preventDefault();
                                            setAuthModalMessage('Para publicar um item e compartilhar suas peças com a comunidade, você precisa fazer login na sua conta.');
                                            setShowAuthModal(true);
                                            return;
                                        }
                                        navigate('/publicar');
                                    }}>
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
                                    <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/vestidos', 'Vestidos', e)}>
                                        Vestidos
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/blusas', 'Blusas', e)}>
                                        Blusas
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/casacos', 'Casacos', e)}>
                                        Casacos
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/calcados', 'Calçados', e)}>
                                        Calçados
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/inverno', 'Roupas de Inverno', e)}>
                                        Roupas de Inverno
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/verao', 'Roupas de Verão', e)}>
                                        Roupas de Verão
                                    </a>
                                </li>
                                <li>
                                    <a href="#" onClick={(e) => handleAuthenticatedLink('/categorias/jaquetas', 'Jaquetas', e)}>
                                        Jaquetas
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Suporte */}
                        <div className="footer-section">
                            <h4>Suporte</h4>
                            <ul className="footer-links">
                                <li><a href="#" onClick={e => { e.preventDefault(); openChatCategory('duvidas-gerais'); }}>Central de Ajuda</a></li>
                                <li><a href="#" onClick={e => { e.preventDefault(); openChatCategory('publicar-anuncio'); }}>Como Funciona</a></li>
                                <li><a href="#" onClick={e => { e.preventDefault(); openChatCategory('encontros-trocas'); }}>Dicas de Segurança</a></li>
                                <li><a href="#" onClick={e => { e.preventDefault(); openChatCategory('suporte'); }}>Fale Conosco</a></li>
                                <li><a href="#" onClick={e => { e.preventDefault(); setShowTerms(true); }}>Termos de Uso</a></li>
                                <li><a href="#" onClick={e => { e.preventDefault(); setShowPrivacy(true); }}>Política de Privacidade</a></li>
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
                                <a href="#" onClick={e => { e.preventDefault(); setShowTerms(true); }}>Termos</a>
                                <span>•</span>
                                <a href="#" onClick={e => { e.preventDefault(); setShowPrivacy(true); }}>Privacidade</a>
                                <span>•</span>
                                <a href="#" onClick={e => { e.preventDefault(); alert('Este site utiliza cookies apenas para funcionamento básico e não armazena dados sensíveis.'); }}>Cookies</a>
                            </div>
                        </div>
                        <p className="footer-sustainability">
                            🌱 Juntos por um consumo mais consciente e sustentável
                        </p>
                    </div>
                </div>
            </footer>

            {/* Modal de Autenticação */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                message={authModalMessage}
                title="Login Necessário"
            />

            {/* Modal de Termos de Uso */}
            <InfoModal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Termos de Uso">
                <p>Estes são os Termos de Uso do ReVeste. Ao utilizar a plataforma, você concorda em respeitar as regras de convivência, não publicar conteúdo ofensivo e agir sempre com honestidade nas trocas. O descumprimento pode resultar em banimento. Para mais detalhes, entre em contato pelo chat.</p>
            </InfoModal>

            {/* Modal de Política de Privacidade */}
            <InfoModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Política de Privacidade">
                <p>Suas informações são protegidas e usadas apenas para facilitar as trocas na plataforma. Não compartilhamos seus dados com terceiros sem consentimento. Para dúvidas sobre privacidade, fale conosco pelo chat.</p>
            </InfoModal>
        </>
    );
};

export default Footer;