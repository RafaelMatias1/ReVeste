import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import ProdutoCard from '../components/ProdutoCard';
import { useFavorites } from '../context/FavoritesContext';

const Favoritos = ({ produtos }) => {
    const { favoritos } = useFavorites();

    return (
        <PageLayout 
            title="Meus Favoritos" 
            subtitle={`${favoritos.length} ${favoritos.length === 1 ? 'item favoritado' : 'itens favoritados'}`}
            className="favoritos-page"
        >
            <div className="favoritos-content">
                {favoritos.length === 0 ? (
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
                        {favoritos.map((produto) => (
                            <Link to={`/produto/${produto.id}`} className="item-link" key={produto.id}>
                                <ProdutoCard produto={produto} />
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default Favoritos;