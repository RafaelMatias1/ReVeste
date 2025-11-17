import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
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
    // Todos os produtos são gerenciados pela API/Backend
    // Cada página busca seus próprios dados conforme necessário

    return (
        <AuthProvider>
            <FavoritesProvider>
                <Router>
                    <ScrollToTop />
                    <div className="App">
                        <Routes>
                            {/* Rotas públicas */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/registro" element={<Register />} />
                            <Route path="/sobre-nos" element={<SobreNos />} />
                            
                            {/* Rotas de categorias (públicas mas com modal) */}
                            <Route path="/categorias/:categoria" element={<CategoriaPage />} />
                            
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
                                    <Favoritos />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/meus-anuncios" element={
                                <PrivateRoute>
                                    <MeusAnuncios />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/publicar" element={
                                <PrivateRoute>
                                    <AddProduto />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/editar-anuncio/:id" element={
                                <PrivateRoute>
                                    <AddProduto />
                                </PrivateRoute>
                            } />
                            
                            <Route path="/produto/:id" element={
                                <PrivateRoute>
                                    <ProdutoDetalhes />
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