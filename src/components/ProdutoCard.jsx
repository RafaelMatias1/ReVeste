import React from 'react';
import { Link } from 'react-router-dom';
import SafeImage from './SafeImage';
import FavoriteButton from './FavoriteButton'; // NOVO IMPORT
import '../styles/ProdutoCard.css';

const ProdutoCard = ({ produto }) => {
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
        <div className="produto-card" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="produto-fotos">
                <SafeImage
                    src={produto.fotos && produto.fotos[0]}
                    alt={produto.titulo}
                    fallback="/img/placeholder.jpg"
                />
                {/* BOTÃO DE FAVORITO ADICIONADO */}
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
    );
};

export default ProdutoCard;