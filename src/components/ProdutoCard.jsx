import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SafeImage from './SafeImage';
import FavoriteButton from './FavoriteButton';
import AuthModal from './AuthModal';
import { useAuth } from '../context/AuthContext';
import '../styles/ProdutoCard.css';

const ProdutoCard = ({ produto }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleCardClick = (e) => {
        // Se não estiver logado, mostra o modal
        if (!isAuthenticated) {
            e.preventDefault();
            setShowAuthModal(true);
            return;
        }
        // Se estiver logado, permite a navegação normal
        navigate(`/produto/${produto.id}`);
    };

    const formatarData = (data) => {
        if (!data || data === 'N/A') return 'Data não informada';
        
        try {
            const dataObj = new Date(data);
            return dataObj.toLocaleDateString('pt-BR');
        } catch (error) {
            return 'Data inválida';
        }
    };

    const formatarCondicao = (condicao) => {
        if (!condicao || condicao === 'N/A') return 'Condição não informada';
        
        const condicoes = {
            'novo-etiqueta': 'Novo com etiqueta',
            'novo-sem-etiqueta': 'Novo sem etiqueta',
            'usado-perfeito': 'Usado - Perfeito',
            'usado-bom': 'Usado - Bom estado',
            'usado-regular': 'Usado - Estado regular'
        };
        
        return condicoes[condicao] || condicao;
    };

    return (
        <>
            <div 
                className="produto-card" 
                onClick={handleCardClick}
                style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    cursor: 'pointer'
                }}
            >
                <div className="produto-fotos">
                    <SafeImage
                        src={produto.fotos && produto.fotos[0]}
                        alt={produto.titulo}
                        fallback="/img/placeholder.jpg"
                    />
                    <FavoriteButton produto={produto} />
                </div>
                
                <div className="produto-info" style={{ textDecoration: 'none' }}>
                    <h3 style={{ textDecoration: 'none', color: '#6A8A65' }}>
                        {produto.titulo}
                    </h3>
                    <p className="produto-descricao" style={{ textDecoration: 'none', color: '#555' }}>
                        {produto.descricao}
                    </p>
                    
                    <div className="produto-detalhes" style={{ textDecoration: 'none' }}>
                        <span style={{ textDecoration: 'none', color: '#777' }}>
                            {produto.categoria}
                        </span>
                        <span style={{ textDecoration: 'none', color: '#777' }}>
                            Tam. {produto.tamanho}
                        </span>
                        <span style={{ textDecoration: 'none', color: '#777' }}>
                            {formatarCondicao(produto.condicao)}
                        </span>
                    </div>
                    
                    <div className="produto-meta" style={{ textDecoration: 'none' }}>
                        <span className="produto-data" style={{ textDecoration: 'none', color: '#888' }}>
                            {formatarData(produto.dataPublicacao)}
                        </span>
                        <span className="produto-localizacao" style={{ textDecoration: 'none', color: '#888' }}>
                            📍 {produto.localizacao}
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal de Autenticação */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                message="Para ver os detalhes deste produto e interagir com outros usuários, você precisa fazer login na sua conta."
                title="Login Necessário"
            />
        </>
    );
};

export default ProdutoCard;