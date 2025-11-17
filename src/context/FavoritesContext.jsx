import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const { user, isAuthenticated } = useAuth();
    const [favoritos, setFavoritos] = useState([]);

    // Carrega favoritos do localStorage quando o usuário muda
    useEffect(() => {
        if (typeof window === 'undefined') {
            setFavoritos([]);
            return;
        }
        
        if (isAuthenticated && user) {
            const favoritosKey = `favoritos_${user.email}`;
            const favoritosSalvos = localStorage.getItem(favoritosKey);
            if (favoritosSalvos) {
                setFavoritos(JSON.parse(favoritosSalvos));
            } else {
                setFavoritos([]);
            }
        } else {
            setFavoritos([]);
        }
    }, [user, isAuthenticated]);

    // Salva favoritos no localStorage
    const salvarFavoritos = (novosFavoritos) => {
        if (typeof window === 'undefined') {
            return;
        }
        
        if (user) {
            const favoritosKey = `favoritos_${user.email}`;
            localStorage.setItem(favoritosKey, JSON.stringify(novosFavoritos));
            setFavoritos(novosFavoritos);
        }
    };

    const adicionarFavorito = (produto) => {
        if (!isAuthenticated) return false;
        
        const novosFavoritos = [...favoritos, produto];
        salvarFavoritos(novosFavoritos);
        return true;
    };

    const removerFavorito = (produtoId) => {
        const novosFavoritos = favoritos.filter(fav => fav.id !== produtoId);
        salvarFavoritos(novosFavoritos);
    };

    const isFavorito = (produtoId) => {
        return favoritos.some(fav => fav.id === produtoId);
    };

    const toggleFavorito = (produto) => {
        if (!isAuthenticated) return false;
        
        if (isFavorito(produto.id)) {
            removerFavorito(produto.id);
            return false;
        } else {
            adicionarFavorito(produto);
            return true;
        }
    };

    return (
        <FavoritesContext.Provider value={{
            favoritos,
            adicionarFavorito,
            removerFavorito,
            isFavorito,
            toggleFavorito
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}