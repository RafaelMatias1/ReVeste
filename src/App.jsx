import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import styles from './styles/App.module.css';
import './styles/globals.css';
import './styles/EmptyState.css';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Chat from './pages/Chat';
import Favoritos from './pages/Favoritos';
import MeusAnuncios from './pages/MeusAnuncios';
import AddProduto from './pages/AddProduto';
import ProdutoDetalhes from './pages/ProdutoDetalhes';
import CategoriaPage from './pages/CategoriaPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const initialProdutosData = [
  {
    id: 1,
    titulo: "Vestido Floral de Verão",
    descricao: "Vestido leve e fresco, ideal para o verão. Estampa floral vibrante. Em perfeito estado, pouco usado.",
    fotos: ["/img/vestido-floral.jpg"],
    categoria: "vestidos",
    genero: "feminino",
    tamanho: "M",
    condicao: "usado-perfeito",
    localizacao: "Florianópolis/SC",
    dataPublicacao: "2025-06-12",
    userId: 1
  },
  {
    id: 2,
    titulo: "Calça Jeans Skinny",
    descricao: "Calça jeans confortável e estilosa, cor azul médio. Pouco usada, sem avarias.",
    fotos: ["/img/calca-jeans.jpg"],
    categoria: "calcas",
    genero: "feminino",
    tamanho: "38",
    condicao: "usado-bom",
    localizacao: "São Paulo/SP",
    dataPublicacao: "2025-06-11",
    userId: 2
  },
  {
    id: 3,
    titulo: "Moletom Canguru Marrom",
    descricao: "Moletom quente e confortável, ótimo para o inverno. Cor marrom sólido. Novo, nunca usado.",
    fotos: ["/img/MoletomMarrom.jpeg"],
    categoria: "casacos",
    genero: "masculino",
    tamanho: "P",
    condicao: "novo-etiqueta",
    localizacao: "Curitiba/PR",
    dataPublicacao: "2025-06-10",
    userId: 1
  },
  {
    id: 4,
    titulo: "Tênis Casual Vans",
    descricao: "Tênis clássico Vans, cor preta com solado branco. Usado poucas vezes, em bom estado.",
    fotos: ["/img/VansMasc.jpeg"],
    categoria: "calcados",
    genero: "unissex",
    tamanho: "40",
    condicao: "usado-bom",
    localizacao: "Rio de Janeiro/RJ",
    dataPublicacao: "2025-06-09",
    userId: 2
  }
];

function App() {
  const [produtos, setProdutos] = useState(() => {
    const savedProdutos = localStorage.getItem('reveste_produtos');
    return savedProdutos ? JSON.parse(savedProdutos) : initialProdutosData;
  });

  useEffect(() => {
    localStorage.setItem('reveste_produtos', JSON.stringify(produtos));
  }, [produtos]);

  const addProduto = (newProduto) => {
    const newId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
    const produtoWithIdAndDate = {
      ...newProduto,
      id: newId,
      dataPublicacao: new Date().toISOString().split('T')[0]
    };
    setProdutos([...produtos, produtoWithIdAndDate]);
  };

  const updateProduto = (updatedProduto) => {
    setProdutos(produtos.map(prod => (prod.id === updatedProduto.id ? updatedProduto : prod)));
  };

  const deleteProduto = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este anúncio?")) {
        setProdutos(produtos.filter(prod => prod.id !== id));
        return true;
    }
    return false;
  };

  return (
    <div className={styles.App}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home produtos={produtos} deleteProduto={deleteProduto} />} />
            
            <Route
              path="/publicar"
              element={
                <PrivateRoute>
                  <AddProduto addProduto={addProduto} />
                </PrivateRoute>
              }
            />

            <Route path="/produto/:id" element={<ProdutoDetalhes produtos={produtos} deleteProduto={deleteProduto} />} />

            <Route
              path="/editar-anuncio/:id"
              element={
                <PrivateRoute>
                  <AddProduto
                    produtos={produtos}
                    updateProduto={updateProduto}
                    deleteProduto={deleteProduto}
                  />
                </PrivateRoute>
              }
            />

            <Route path="/categorias/:categoriaId" element={<CategoriaPage produtos={produtos} />} />

            <Route path="/registro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <Perfil />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/favoritos"
              element={
                <PrivateRoute>
                  <Favoritos />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/meus-anuncios"
              element={
                <PrivateRoute>
                  <MeusAnuncios />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;