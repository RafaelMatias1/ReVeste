import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../components/PageLayout';
import SafeImage from '../components/SafeImage';
import '../styles/SafeImage.css';
import '../styles/MeusAnuncios.css';

const MeusAnuncios = () => {
    const { user } = useAuth();
    const [meusProdutos, setMeusProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarMeusProdutos = () => {
            try {
                const produtos = JSON.parse(localStorage.getItem('reveste_produtos')) || [];
                const usuarioAtual = user || JSON.parse(localStorage.getItem("usuarioReVeste"));
                
                if (usuarioAtual && usuarioAtual.email) {
                    // Filtra produtos do usuário atual baseado no email
                    const produtosDoUsuario = produtos.filter(produto => 
                        produto.userEmail === usuarioAtual.email || 
                        produto.userId === usuarioAtual.id ||
                        produto.autorEmail === usuarioAtual.email
                    );
                    setMeusProdutos(produtosDoUsuario);
                }
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
                setMeusProdutos([]);
            } finally {
                setLoading(false);
            }
        };

        carregarMeusProdutos();

        // Listener para atualizar quando localStorage mudar
        const handleStorageChange = () => {
            carregarMeusProdutos();
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Também escuta mudanças locais
        const interval = setInterval(carregarMeusProdutos, 2000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [user]);

    const handleDelete = (id) => {
        if (window.confirm("Tem certeza que deseja excluir este anúncio?")) {
            try {
                const produtos = JSON.parse(localStorage.getItem('reveste_produtos')) || [];
                const produtosAtualizados = produtos.filter(produto => produto.id !== id);
                localStorage.setItem('reveste_produtos', JSON.stringify(produtosAtualizados));
                setMeusProdutos(produtosAtualizados.filter(produto => {
                    const usuarioAtual = user || JSON.parse(localStorage.getItem("usuarioReVeste"));
                    return usuarioAtual && (
                        produto.userEmail === usuarioAtual.email || 
                        produto.userId === usuarioAtual.id ||
                        produto.autorEmail === usuarioAtual.email
                    );
                }));
            } catch (error) {
                console.error('Erro ao excluir produto:', error);
            }
        }
    };

    if (loading) {
        return (
            <PageLayout 
                title="Meus Anúncios" 
                subtitle="Carregando seus produtos..."
                className="meus-anuncios-page"
            >
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Carregando...</p>
                </div>
            </PageLayout>
        );
    }

    if (meusProdutos.length === 0) {
        return (
            <PageLayout 
                title="Meus Anúncios" 
                subtitle="Gerencie seus itens publicados"
                className="meus-anuncios-page"
            >
                <div className="meus-anuncios-content">
                    <div className="empty-state">
                        <div className="empty-icon">📝</div>
                        <h3>Nenhum anúncio publicado</h3>
                        <p>Você ainda não publicou nenhum item para troca. Que tal começar agora?</p>
                        <Link to="/publicar" className="btn btn-primary">
                            Publicar Primeiro Item
                        </Link>
                    </div>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout 
            title="Meus Anúncios" 
            subtitle={`${meusProdutos.length} ${meusProdutos.length === 1 ? 'item publicado' : 'itens publicados'}`}
            className="meus-anuncios-page"
        >
            <div className="meus-anuncios-content">
                <div className="produtos-grid">
                    {meusProdutos.map((produto) => (
                        <div key={produto.id} className="produto-card">
                            <div className="produto-imagem">
                                <SafeImage
                                    src={produto.fotos && produto.fotos[0]}
                                    alt={produto.titulo}
                                    fallback="/img/placeholder.jpg"
                                />
                                <div className="produto-status">
                                    <span className={`status-badge ${produto.ativo !== false ? 'ativo' : 'inativo'}`}>
                                        {produto.ativo !== false ? 'Ativo' : 'Inativo'}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="produto-info">
                                <h3 className="produto-titulo">{produto.titulo}</h3>
                                <p className="produto-descricao">
                                    {produto.descricao.length > 80 
                                        ? `${produto.descricao.substring(0, 80)}...` 
                                        : produto.descricao
                                    }
                                </p>
                                <div className="produto-detalhes">
                                    <span className="produto-categoria">{produto.categoria}</span>
                                    <span className="produto-tamanho">Tam. {produto.tamanho}</span>
                                    <span className="produto-condicao">{produto.condicao}</span>
                                </div>
                                <div className="produto-meta">
                                    <span className="produto-data">
                                        Publicado em {new Date(produto.dataPublicacao).toLocaleDateString('pt-BR')}
                                    </span>
                                    <span className="produto-localizacao">📍 {produto.localizacao}</span>
                                </div>
                            </div>

                            <div className="produto-actions">
                                <Link 
                                    to={`/produto/${produto.id}`} 
                                    className="btn btn-outline"
                                >
                                    Ver Detalhes
                                </Link>
                                <Link 
                                    to={`/editar-anuncio/${produto.id}`} 
                                    className="btn btn-secondary"
                                >
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleDelete(produto.id)}
                                    className="btn btn-danger"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
};

export default MeusAnuncios;