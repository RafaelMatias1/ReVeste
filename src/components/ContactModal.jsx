import React from 'react';
import '../styles/ContactModal.css';

const ContactModal = ({ isOpen, onClose, vendedorEmail, produtoTitulo }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(vendedorEmail);
        // Feedback visual que foi copiado
        const button = document.querySelector('.copy-email-btn');
        const originalText = button.textContent;
        button.textContent = 'Copiado!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#6A8A65';
        }, 2000);
    };

    const handleWhatsApp = () => {
        const message = `Olá! Vi seu anúncio "${produtoTitulo}" no ReVeste e tenho interesse em fazer uma proposta de troca. Podemos conversar?`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="contact-modal-overlay" onClick={handleOverlayClick}>
            <div className="contact-modal">
                <div className="contact-modal-header">
                    <h3>💬 Entrar em Contato</h3>
                    <button className="close-modal-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>
                
                <div className="contact-modal-body">
                    <div className="contact-info">
                        <div className="contact-item-title">
                            <h4>📧 E-mail do Vendedor</h4>
                        </div>
                        
                        <div className="email-container">
                            <span className="email-text">{vendedorEmail}</span>
                            <button 
                                className="copy-email-btn"
                                onClick={handleCopyEmail}
                                title="Copiar e-mail"
                            >
                                📋 Copiar
                            </button>
                        </div>
                        
                        <div className="contact-divider">
                            <span>ou</span>
                        </div>
                        
                        <div className="whatsapp-container">
                            <button 
                                className="whatsapp-btn"
                                onClick={handleWhatsApp}
                                title="Compartilhar via WhatsApp"
                            >
                                💬 Compartilhar no WhatsApp
                            </button>
                        </div>
                    </div>
                    
                    <div className="contact-tips">
                        <h5>💡 Dicas importantes:</h5>
                        <ul>
                            <li>Sempre se encontrem em locais públicos e seguros</li>
                            <li>Confirme as condições e medidas da peça antes do encontro</li>
                            <li>Seja claro sobre o que você oferece em troca</li>
                            <li>Mantenha uma comunicação respeitosa</li>
                        </ul>
                    </div>
                </div>
                
                <div className="contact-modal-footer">
                    <button className="btn-close-modal" onClick={onClose}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;