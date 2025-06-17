import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import '../styles/FavoriteButton.css';

const FavoriteButton = ({ produto, size = 'normal', className = '' }) => {
    const { toggleFavorito, isFavorito } = useFavorites();
    const { isAuthenticated } = useAuth();
    const favorited = isFavorito(produto.id);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isAuthenticated) {
            alert('Faça login para favoritar produtos!');
            return;
        }
        
        const result = toggleFavorito(produto);
        if (result) {
            // Produto foi favoritado
        } else {
            // Produto foi desfavoritado
        }
    };

    return (
        <button 
            className={`favorite-button ${size} ${favorited ? 'favorited' : ''} ${className}`}
            onClick={handleClick}
            title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
            <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill={favorited ? "#e74c3c" : "none"} 
                stroke={favorited ? "#e74c3c" : "#6c757d"}
                strokeWidth="2"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
        </button>
    );
};

export default FavoriteButton;