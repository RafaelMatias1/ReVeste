import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importe seus estilos
import styles from './styles/App.module.css'; // Para a className={styles.App}
import './styles/globals.css';     // Seu CSS global

// Importe seus componentes e páginas
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Chat from './pages/Chat';

// Importe as novas páginas e componentes relacionados a produtos
import AddProduto from './pages/AddProduto'; // Página para adicionar/editar produtos
import ProdutoDetalhes from './pages/ProdutoDetalhes'; // <--- NOVA IMPORTAÇÃO: Página de detalhes do produto
import CategoriaPage from './pages/CategoriaPage';     // <--- NOVA IMPORTAÇÃO: Página de listagem por categoria
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';


// Dados iniciais de produtos para começar (simula um "banco de dados")
// **ATENÇÃO:** CERTIFIQUE-SE DE QUE ESTES ARQUIVOS EXISTAM NA SUA PASTA `public/img/`
const initialProdutosData = [
  {
    id: 1,
    titulo: "Vestido Floral de Verão",
    descricao: "Vestido leve e fresco, ideal para o verão. Estampa floral vibrante. Em perfeito estado, pouco usado.",
    fotos: ["/img/vestido-floral.jpg"], // Exemplo: public/img/vestido-floral.jpg
    categoria: "vestidos",
    genero: "feminino",
    tamanho: "M",
    condicao: "usado-perfeito",
    localizacao: "Florianópolis/SC",
    dataPublicacao: "2025-06-12",
    userId: 1 // Adicionado para simular o dono do anúncio
  },
  {
    id: 2,
    titulo: "Calça Jeans Skinny",
    descricao: "Calça jeans confortável e estilosa, cor azul médio. Pouco usada, sem avarias.",
    fotos: ["/img/calca-jeans.jpg"], // Exemplo: public/img/calca-jeans.jpg
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
  },
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

  // Função para remover um produto
  const deleteProduto = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este anúncio?")) {
        setProdutos(produtos.filter(prod => prod.id !== id));
        return true; // Indica que a exclusão foi confirmada e executada
    }
    return false; // Indica que a exclusão foi cancelada
  };


  return (
    <div className={styles.App}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Rota da Home: Passa a lista de produtos e a função de exclusão */}
            <Route path="/" element={<Home produtos={produtos} deleteProduto={deleteProduto} />} />

            {/* Rota para Publicar Item */}
            <Route
              path="/publicar"
              element={
                <PrivateRoute>
                  <AddProduto addProduto={addProduto} />
                </PrivateRoute>
              }
            />

            {/* Rota para Detalhes do Produto (AGORA ATIVA) */}
            {/* Passa produtos e deleteProduto para que a página de detalhes possa encontrar o produto e ter a opção de excluir */}
            <Route path="/produto/:id" element={<ProdutoDetalhes produtos={produtos} deleteProduto={deleteProduto} />} />

            {/* Rota para Editar Anúncio */}
            <Route
              path="/editar-anuncio/:id"
              element={
                <PrivateRoute>
                  <AddProduto
                    produtos={produtos}
                    updateProduto={updateProduto}
                    deleteProduto={deleteProduto} // Passa deleteProduto para a página de edição também
                  />
                </PrivateRoute>
              }
            />

            {/* Rota para Páginas de Categoria (AGORA ATIVA) */}
            <Route path="/categorias/:categoriaId" element={<CategoriaPage produtos={produtos} />} />


            {/* Suas outras rotas existentes */}
            <Route path="/registro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <Perfil />
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