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
import SobreNos from './pages/SobreNos';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

const initialProdutosData = [
  {
    id: 1,
    titulo: "Vestido Verde Militar",
    fotos: ["/img/vestido-verde.jpg"],
    categoria: "vestidos",
    genero: "feminino",
    tamanho: "M",
    condicao: "usado-perfeito",
    localizacao: "São Paulo/SP",
    dataPublicacao: "2025-06-12",
    userId: 1,
    userEmail: "usuario1@example.com"
  },
  {
    id: 2,
    titulo: "Vestido Preto Elegante",
    descricao: "Vestido preto com brilho e detalhes em franjas. Perfeito para festas e eventos especiais.",
    fotos: ["/img/vestido-preto.jpg"],
    categoria: "vestidos",
    genero: "feminino",
    tamanho: "P",
    condicao: "usado-bom",
    localizacao: "Rio de Janeiro/RJ",
    dataPublicacao: "2025-06-11",
    userId: 2,
    userEmail: "usuario2@example.com"
  },
  {
    id: 3,
    titulo: "Vestido Branco Longo",
    descricao: "Vestido longo branco com alças ajustáveis. Tecido leve e fresco para o verão.",
    fotos: ["/img/vestido-branco.jpg"],
    categoria: "vestidos",
    genero: "feminino",
    tamanho: "G",
    condicao: "novo-sem-etiqueta",
    localizacao: "Belo Horizonte/MG",
    dataPublicacao: "2025-06-10",
    userId: 3,
    userEmail: "usuario3@example.com"
  },
  {
    id: 4,
    titulo: "Top de Crochê Listrado",
    descricao: "Top de crochê feito à mão com listras azuis e brancas. Peça única e artesanal.",
    fotos: ["/img/top-croche.jpg"],
    categoria: "blusas",
    genero: "feminino",
    tamanho: "P",
    condicao: "novo-etiqueta",
    localizacao: "Florianópolis/SC",
    dataPublicacao: "2025-06-09",
    userId: 4,
    userEmail: "usuario4@example.com"
  },
  {
    id: 5,
    titulo: "Tênis Vans Old Skool",
    descricao: "Tênis Vans clássico preto com detalhes brancos. Pouco usado, em excelente estado.",
    fotos: ["/img/tenis-vans.jpg"],
    categoria: "calcados",
    genero: "unissex",
    tamanho: "38",
    condicao: "usado-perfeito",
    localizacao: "Curitiba/PR",
    dataPublicacao: "2025-06-08",
    userId: 5,
    userEmail: "usuario5@example.com"
  },
  {
    id: 6,
    titulo: "Tênis Converse All Star",
    descricao: "All Star preto clássico, nunca sai de moda. Confortável e versátil para qualquer look.",
    fotos: ["/img/tenis-converse.jpg"],
    categoria: "calcados",
    genero: "unissex",
    tamanho: "40",
    condicao: "usado-bom",
    localizacao: "Porto Alegre/RS",
    dataPublicacao: "2025-06-07",
    userId: 6,
    userEmail: "usuario6@example.com"
  },
  {
    id: 7,
    titulo: "Moletom Marrom Oversized",
    descricao: "Moletom super confortável e quentinho. Cor marrom neutra que combina com tudo.",
    fotos: ["/img/moletom-marrom.jpg"],
    categoria: "casacos",
    genero: "unissex",
    tamanho: "M",
    condicao: "usado-perfeito",
    localizacao: "Brasília/DF",
    dataPublicacao: "2025-06-06",
    userId: 7,
    userEmail: "usuario7@example.com"
  },
  {
    id: 8,
    titulo: "Moletom Azul com Capuz",
    descricao: "Moletom azul marinho com capuz e bolso canguru. Ideal para dias frios e looks casuais.",
    fotos: ["/img/moletom-azul.jpg"],
    categoria: "casacos",
    genero: "unissex",
    tamanho: "G",
    condicao: "novo-sem-etiqueta",
    localizacao: "Salvador/BA",
    dataPublicacao: "2025-06-05",
    userId: 8,
    userEmail: "usuario8@example.com"
  },
  {
    id: 9,
    titulo: "Jaqueta de Couro Preta",
    descricao: "Jaqueta de couro sintético preta com zíperes. Estilo rock and roll, muito estilosa.",
    fotos: ["/img/jaqueta-couro.jpg"],
    categoria: "jaquetas",
    genero: "feminino",
    tamanho: "M",
    condicao: "usado-bom",
    localizacao: "Recife/PE",
    dataPublicacao: "2025-06-04",
    userId: 9,
    userEmail: "usuario9@example.com"
  },
  {
    id: 10,
    titulo: "Jaqueta Puffer Bege",
    descricao: "Jaqueta puffer bege com capuz. Super quente e moderna, perfeita para o inverno.",
    fotos: ["/img/jaqueta-bege.jpg"],
    categoria: "jaquetas",
    genero: "feminino",
    tamanho: "P",
    condicao: "novo-etiqueta",
    localizacao: "Fortaleza/CE",
    dataPublicacao: "2025-06-03",
    userId: 10,
    userEmail: "usuario10@example.com"
  },
  {
    id: 11,
    titulo: "Jaqueta Jeans com Pelo",
    descricao: "Jaqueta jeans com forro de pelinho. Combinação perfeita de estilo e conforto.",
    fotos: ["/img/jaqueta-jeans.jpg"],
    categoria: "jaquetas",
    genero: "unissex",
    tamanho: "M",
    condicao: "usado-perfeito",
    localizacao: "Manaus/AM",
    dataPublicacao: "2025-06-02",
    userId: 11,
    userEmail: "usuario11@example.com"
  },
  {
    id: 12,
    titulo: "Conjunto Infantil Verde",
    descricao: "Conjunto infantil com camiseta e shorts. Estampa de palmeira, super fofo e confortável.",
    fotos: ["/img/conjunto-infantil.jpg"],
    categoria: "infantil",
    genero: "masculino",
    tamanho: "4 anos",
    condicao: "novo-etiqueta",
    localizacao: "Natal/RN",
    dataPublicacao: "2025-06-01",
    userId: 12,
    userEmail: "usuario12@example.com"
  },
  {
    id: 13,
    titulo: "Calça Jogger Bege",
    descricao: "Calça jogger bege com cordão ajustável. Tecido macio e confortável para o dia a dia.",
    fotos: ["/img/calca-bege.jpg"],
    categoria: "calcas",
    genero: "unissex",
    tamanho: "M",
    condicao: "usado-bom",
    localizacao: "Goiânia/GO",
    dataPublicacao: "2025-05-31",
    userId: 13,
    userEmail: "usuario13@example.com"
  },
  {
    id: 14,
    titulo: "Camiseta Básica Bege",
    descricao: "Camiseta básica cor bege, essencial no guarda-roupa. Tecido de algodão macio.",
    fotos: ["/img/camiseta-bege.jpg"],
    categoria: "camisetas",
    genero: "unissex",
    tamanho: "G",
    condicao: "novo-sem-etiqueta",
    localizacao: "Belém/PA",
    dataPublicacao: "2025-05-30",
    userId: 14,
    userEmail: "usuario14@example.com"
  },
  {
    id: 15,
    titulo: "Regata Branca Feminina",
    descricao: "Regata branca básica feminina. Corte moderno e tecido fresquinho para o verão.",
    fotos: ["/img/regata-branca.jpg"],
    categoria: "blusas",
    genero: "feminino",
    tamanho: "P",
    condicao: "usado-perfeito",
    localizacao: "Vitória/ES",
    dataPublicacao: "2025-05-29",
    userId: 15,
    userEmail: "usuario15@example.com"
  }
];

export default function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Carrega produtos do localStorage ou usa os dados iniciais
    const produtosSalvos = localStorage.getItem('reveste_produtos');
    if (produtosSalvos) {
      const produtosParsed = JSON.parse(produtosSalvos);
      // Combina produtos salvos com produtos iniciais (evita duplicatas)
      const produtosCombinados = [...initialProdutosData];
      produtosParsed.forEach(produto => {
        if (!produtosCombinados.find(p => p.id === produto.id)) {
          produtosCombinados.push(produto);
        }
      });
      setProdutos(produtosCombinados);
      localStorage.setItem('reveste_produtos', JSON.stringify(produtosCombinados));
    } else {
      setProdutos(initialProdutosData);
      localStorage.setItem('reveste_produtos', JSON.stringify(initialProdutosData));
    }
  }, []);

  const addProduto = (novoProduto) => {
    const produtoComId = {
      ...novoProduto,
      id: Date.now(),
      dataPublicacao: new Date().toISOString().split('T')[0]
    };
    
    const novosProdutos = [...produtos, produtoComId];
    setProdutos(novosProdutos);
    localStorage.setItem('reveste_produtos', JSON.stringify(novosProdutos));
  };

  const updateProduto = (produtoAtualizado) => {
    const produtosAtualizados = produtos.map(produto =>
      produto.id === produtoAtualizado.id ? produtoAtualizado : produto
    );
    setProdutos(produtosAtualizados);
    localStorage.setItem('reveste_produtos', JSON.stringify(produtosAtualizados));
  };

  const deleteProduto = (id) => {
    try {
      console.log('Deletando produto com ID:', id);
      
      // Atualizar o estado local
      const produtosAtualizados = produtos.filter(produto => produto.id !== parseInt(id));
      setProdutos(produtosAtualizados);
      
      // Atualizar o localStorage
      localStorage.setItem('reveste_produtos', JSON.stringify(produtosAtualizados));
      
      // Disparar evento customizado para outros componentes
      window.dispatchEvent(new CustomEvent('productDeleted', { detail: { id: parseInt(id) } }));
      
      console.log('Produto deletado com sucesso:', id);
      return true;
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      return false;
    }
  };

  // Função para debug - verificar produtos no localStorage
  const debugProdutos = () => {
    const produtosLS = JSON.parse(localStorage.getItem('reveste_produtos') || '[]');
    console.log('Produtos no localStorage:', produtosLS.length);
    console.log('Produtos no estado:', produtos.length);
    console.log('Diferença:', produtosLS.length - produtos.length);
    return produtosLS;
  };

  // Adicionar função global para debug
  window.debugProdutos = debugProdutos;

  useEffect(() => {
    // Listener para evento customizado de deleção
    const handleProductDeleted = (e) => {
      const { id } = e.detail;
      console.log('Produto deletado detectado:', id);
      
      // Recarregar produtos do localStorage
      const produtosAtualizados = JSON.parse(localStorage.getItem('reveste_produtos') || '[]');
      setProdutos(produtosAtualizados);
    };

    // Listener para mudanças no localStorage (sincronização entre abas)
    const handleStorageChange = (e) => {
      if (e.key === 'reveste_produtos') {
        try {
          const novosProdutos = JSON.parse(e.newValue || '[]');
          setProdutos(novosProdutos);
          console.log('Produtos sincronizados via storage event');
        } catch (error) {
          console.error('Erro ao sincronizar produtos:', error);
        }
      }
    };

    window.addEventListener('productDeleted', handleProductDeleted);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('productDeleted', handleProductDeleted);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <ScrollToTop />
          <div className={styles.App}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/" element={<Home produtos={produtos} />} />
              <Route path="/sobre-nos" element={<SobreNos />} />
              <Route path="/perfil" element={<PrivateRoute><Perfil /></PrivateRoute>} />
              <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
              <Route path="/favoritos" element={<PrivateRoute><Favoritos produtos={produtos} /></PrivateRoute>} />
              <Route path="/meus-anuncios" element={<PrivateRoute><MeusAnuncios /></PrivateRoute>} />
              <Route path="/publicar" element={<PrivateRoute><AddProduto addProduto={addProduto} produtos={produtos} /></PrivateRoute>} />
              <Route path="/editar-anuncio/:id" element={<PrivateRoute><AddProduto produtos={produtos} updateProduto={updateProduto} deleteProduto={deleteProduto} /></PrivateRoute>} />
              <Route path="/produto/:id" element={<ProdutoDetalhes produtos={produtos} deleteProduto={deleteProduto} />} />
              <Route path="/categorias/:categoria" element={<CategoriaPage produtos={produtos} />} />
            </Routes>
          </div>
        </Router>
      </FavoritesProvider>
    </AuthProvider>
  );
}