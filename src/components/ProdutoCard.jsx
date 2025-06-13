import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProdutoCard.css'; // Importa o CSS para este componente

const ProdutoCard = ({ produto }) => { // Removidas as props showDeleteButton, onDelete, userId
    // Função para formatar a data
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime()) || dateString === 'N/A' || dateString === '') {
            // Se a data for inválida ou N/A, retorna 'Data Indisponível'
            return 'Data Indisponível';
        }
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pt-BR', options);
    };

    // Determina a URL da foto.
    // Use a primeira foto do array `fotos` do produto, ou a propriedade `img` (para produtos estáticos como categorias),
    // ou o caminho direto para o placeholder em public/img.
    const imageUrl = (produto.fotos && produto.fotos.length > 0)
        ? produto.fotos[0]
        : produto.img || '/img/placeholder.png'; // Caminho direto para public/img/placeholder.png (ESTE DEVE EXISTIR LÁ!)

    // Adaptação para categorias e produtos que podem não ter todas as propriedades
    const displayTitulo = produto.titulo || produto.nome || 'Sem Título';
    const displayDescricao = produto.descricao || 'Sem descrição.';
    const displayCategoria = produto.categoria || 'N/A';
    const displayTamanho = produto.tamanho ? String(produto.tamanho).toUpperCase() : 'N/A'; // Garante que é string
    const displayCondicao = produto.condicao || 'N/A';
    const displayLocalizacao = produto.localizacao || 'N/A';
    const displayDataPublicacao = formatDate(produto.dataPublicacao);

    return (
        <div className="produto-card">
            <div className="produto-fotos">
                <img src={imageUrl} alt={displayTitulo} />
            </div>
            <div className="produto-info">
                <h3>{displayTitulo}</h3>
                <p className="produto-descricao">{displayDescricao}</p>
                <div className="produto-detalhes">
                    <span>Categoria: <strong>{displayCategoria}</strong></span>
                    <span>Tamanho: <strong>{displayTamanho}</strong></span>
                    <span>Condição: <strong>{displayCondicao}</strong></span>
                </div>
                <p className="produto-localizacao">Localização: {displayLocalizacao}</p>
                <p className="produto-data">Publicado em: {displayDataPublicacao}</p>
                {/* REMOVIDO: Botão "Editar Anúncio" daqui. Ele estará na página de detalhes do produto. */}
                {/* REMOVIDO: Botão "Excluir Anúncio" daqui. Ele estará na página de edição. */}
            </div>
        </div>
    );
};

export default ProdutoCard;