import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ProdutoCard from '../components/ProdutoCard';
import { useFavorites } from '../context/FavoritesContext';
import { produtoAPI } from '../services/api';

const Favoritos = () => {
    const { favoritos } = useFavorites();
    const [produtosFavoritos, setProdutosFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarProdutosFavoritos = async () => {
            try {
                if (favoritos.length === 0) {
                    setProdutosFavoritos([]);
                    setLoading(false);
                    return;
                }

                // Carregar todos os produtos da API
                const response = await produtoAPI.getAll();
                const todosProdutos = response.produtos || [];

                // Filtrar produtos favoritos pelo ID
                const produtosFiltrados = todosProdutos.filter(produto => {
                    const produtoId = produto._id || produto.id;
                    return favoritos.some(fav => {
                        const favId = fav._id || fav.id;
                        return favId === produtoId;
                    });
                });

                setProdutosFavoritos(produtosFiltrados);
            } catch (error) {
                console.error('Erro ao carregar produtos favoritos:', error);
                setProdutosFavoritos([]);
            } finally {
                setLoading(false);
            }
        };

        carregarProdutosFavoritos();
    }, [favoritos]);

    if (loading) {
        return (
            <PageLayout 
                title="Meus Favoritos" 
                subtitle="Carregando..."
                className="favoritos-page"
            >
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Carregando favoritos...</p>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout 
            title="Meus Favoritos" 
            subtitle={`${produtosFavoritos.length} ${produtosFavoritos.length === 1 ? 'item favoritado' : 'itens favoritados'}`}
            className="favoritos-page"
        >
            <div className="favoritos-content">
                {produtosFavoritos.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">❤️</div>
                        <h3>Nenhum favorito ainda</h3>
                        <p>Quando você favoritar itens, eles aparecerão aqui para você acessar facilmente.</p>
                        <Link to="/" className="btn btn-primary">
                            Explorar Itens
                        </Link>
                    </div>
                ) : (
                    <div className="produtos-grid">
                        {produtosFavoritos.map((produto) => {
                            const produtoId = produto._id || produto.id;
                            return (
                                <Link to={`/produto/${produtoId}`} className="item-link" key={produtoId}>
                                    <ProdutoCard produto={produto} />
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default Favoritos;