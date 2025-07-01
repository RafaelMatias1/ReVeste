import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { 
    getProdutos, 
    addProdutoToData, 
    updateProdutoInData, 
    deleteProdutoFromData,
    initializeProdutosData 
} from './components/ProdutosData';
import ScrollToTop from './components/ScrollToTop';
import PrivateRoute from './components/PrivateRoute';

// Importação das páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import Chat from './pages/Chat';
import Favoritos from './pages/Favoritos';
import MeusAnuncios from './pages/MeusAnuncios';
import AddProduto from './pages/AddProduto';
import ProdutoDetalhes from './pages/ProdutoDetalhes';
import CategoriaPage from './pages/CategoriaPage';
import SobreNos from './pages/SobreNos';

import './styles/globals.css';

function App() {
    const [produtos, setProdutos] = useState([]);

    // Inicializa produtos quando o app carrega
    useEffect(() => {
        const produtosIniciais = initializeProdutosData();
        setProdutos(produtosIniciais);

        // Listener para mudanças no localStorage (sincronização entre abas)
        const handleStorageChange = () => {
            const produtosAtualizados = getProdutos();
            setProdutos(produtosAtualizados);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('productDeleted', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('productDeleted', handleStorageChange);
        };
    }, []);

    // Função para adicionar produto
    const addProduto = (novoProduto) => {
        try {
            const novosProdutos = addProdutoToData(novoProduto);
            setProdutos(novosProdutos);
            
            // Dispara evento para sincronização
            window.dispatchEvent(new CustomEvent('productAdded', { 
                detail: { produtos: novosProdutos } 
            }));
            
            return true;
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
            return false;
        }
    };

    // Função para atualizar produto
    const updateProduto = (produtoAtualizado) => {
        try {
            const novosProdutos = updateProdutoInData(produtoAtualizado);
            setProdutos(novosProdutos);
            
            // Dispara evento para sincronização
            window.dispatchEvent(new CustomEvent('productUpdated', { 
                detail: { produtos: novosProdutos } 
            }));
            
            return true;
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            return false;
        }
    };

    // Função para deletar produto
    const deleteProduto = (produtoId) => {
        try {
            const novosProdutos = deleteProdutoFromData(produtoId);
            setProdutos(novosProdutos);
            
            // Dispara evento para sincronização
            window.dispatchEvent(new CustomEvent('productDeleted', { 
                detail: { produtos: novosProdutos, deletedId: produtoId } 
            }));
            
            return true;
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            return false;
        }
    };

    return (
        <AuthProvider>
            <FavoritesProvider>
                <Router>
                    <ScrollToTop />
                    <div className="App">
                        <Routes>
                            {/* Rotas públicas */}
                            <Route path="/" element={<Home produtos={produtos} />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/registro" element={<Register />} />
                            <Route path="/sobre-nos" element={<SobreNos />} />
                            
                            {/* Rotas de categorias (públicas mas com modal) */}
                            <Route path="/categorias/:categoria" element={<CategoriaPage produtos={produtos} />} />
                            
                            {/* Rotas privadas */}
                            <Route path="/perfil" element={
                                <PrivateRoute>
                                    <Perfil />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/chat" element={
                                <PrivateRoute>
                                    <Chat />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/favoritos" element={
                                <PrivateRoute>
                                    <Favoritos produtos={produtos} />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/meus-anuncios" element={
                                <PrivateRoute>
                                    <MeusAnuncios />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/publicar" element={
                                <PrivateRoute>
                                    <AddProduto 
                                        addProduto={addProduto}
                                        produtos={produtos}
                                        updateProduto={updateProduto}
                                        deleteProduto={deleteProduto}
                                    />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/editar-anuncio/:id" element={
                                <PrivateRoute>
                                    <AddProduto 
                                        addProduto={addProduto}
                                        produtos={produtos}
                                        updateProduto={updateProduto}
                                        deleteProduto={deleteProduto}
                                    />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/produto/:id" element={
                                <PrivateRoute>
                                    <ProdutoDetalhes 
                                        produtos={produtos} 
                                        deleteProduto={deleteProduto}
                                    />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </div>
                </Router>
            </FavoritesProvider>
        </AuthProvider>
    );
}

export default App;