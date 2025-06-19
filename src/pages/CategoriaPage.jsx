import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import PageLayout from '../components/PageLayout';
import ProdutoCard from '../components/ProdutoCard';
import '../styles/CategoriaPage.css';

const CategoriaPage = ({ produtos = [] }) => {
    const { categoria } = useParams();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [filtroTamanho, setFiltroTamanho] = useState('');
    const [filtroCondicao, setFiltroCondicao] = useState('');
    const [filtroGenero, setFiltroGenero] = useState('');
    const [ordenacao, setOrdenacao] = useState('recentes');
    const [showAuthModal, setShowAuthModal] = useState(false);

    // Mapear as categorias da URL para as categorias dos produtos
    const categoriasMap = {
        'feminino': ['vestidos', 'blusas', 'calcas', 'saias', 'jaquetas'],
        'masculino': ['camisetas', 'calcas', 'casacos', 'jaquetas'],
        'calcados': ['calcados', 'tenis', 'sapatos', 'botas'],
        'inverno': ['casacos', 'jaquetas', 'moletom'],
        'verao': ['vestidos', 'blusas', 'shorts', 'regatas'],
        'infantil': ['infantil'],
        'vestidos': ['vestidos'],
        'blusas': ['blusas'],
        'casacos': ['casacos'],
        'jaquetas': ['jaquetas'],
        'camisetas': ['camisetas'],
        'calcas': ['calcas']
    };

    // Filtrar produtos por categoria
    const produtosFiltrados = useMemo(() => {
        let resultados = produtos;

        // Filtro por categoria
        if (categoriasMap[categoria]) {
            resultados = resultados.filter(produto => 
                categoriasMap[categoria].some(cat => 
                    produto.categoria?.toLowerCase().includes(cat.toLowerCase()) ||
                    produto.genero?.toLowerCase().includes(cat.toLowerCase())
                )
            );
        }

        // Filtro por tamanho
        if (filtroTamanho) {
            resultados = resultados.filter(produto => 
                produto.tamanho?.toLowerCase() === filtroTamanho.toLowerCase()
            );
        }

        // Filtro por condição
        if (filtroCondicao) {
            resultados = resultados.filter(produto => 
                produto.condicao?.toLowerCase() === filtroCondicao.toLowerCase()
            );
        }

        // Filtro por gênero
        if (filtroGenero) {
            resultados = resultados.filter(produto => 
                produto.genero?.toLowerCase() === filtroGenero.toLowerCase()
            );
        }

        // Ordenação
        switch (ordenacao) {
            case 'recentes':
                return resultados.sort((a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao));
            case 'antigos':
                return resultados.sort((a, b) => new Date(a.dataPublicacao) - new Date(b.dataPublicacao));
            case 'alfabetica':
                return resultados.sort((a, b) => a.titulo.localeCompare(b.titulo));
            default:
                return resultados;
        }
    }, [produtos, categoria, filtroTamanho, filtroCondicao, filtroGenero, ordenacao]);

    // Obter nome da categoria para exibição
    const getNomeCategoria = (cat) => {
        const nomes = {
            'feminino': 'Moda Feminina',
            'masculino': 'Moda Masculina',
            'calcados': 'Calçados',
            'inverno': 'Roupas de Inverno',
            'verao': 'Roupas de Verão',
            'infantil': 'Moda Infantil',
            'vestidos': 'Vestidos',
            'blusas': 'Blusas',
            'casacos': 'Casacos',
            'jaquetas': 'Jaquetas',
            'camisetas': 'Camisetas',
            'calcas': 'Calças'
        };
        return nomes[cat] || cat;
    };

    // Limpar todos os filtros
    const limparFiltros = () => {
        setFiltroTamanho('');
        setFiltroCondicao('');
        setFiltroGenero('');
        setOrdenacao('recentes');
    };

    // FUNÇÃO PARA LIDAR COM CLIQUE EM PRODUTO
    const handleProdutoClick = (produtoId, e) => {
        if (!isAuthenticated) {
            e.preventDefault();
            setShowAuthModal(true);
            return;
        }
        navigate(`/produto/${produtoId}`);
    };

    return (
        <>
            <main className="main-categoria-page">
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link to="/">Início</Link>
                        <span>→</span>
                        <span>{getNomeCategoria(categoria)}</span>
                    </nav>

                    {/* Cabeçalho da categoria */}
                    <header className="categoria-header">
                        <h1>{getNomeCategoria(categoria)}</h1>
                        <p className="categoria-contador">
                            {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                        </p>
                    </header>

                    {/* Filtros */}
                    <section className="filtros-container">
                        <div className="filtros-grupo">
                            <div className="filtro">
                                <label htmlFor="filtro-tamanho">Tamanho</label>
                                <select 
                                    id="filtro-tamanho"
                                    value={filtroTamanho}
                                    onChange={(e) => setFiltroTamanho(e.target.value)}
                                >
                                    <option value="">Todos os tamanhos</option>
                                    <option value="pp">PP</option>
                                    <option value="p">P</option>
                                    <option value="m">M</option>
                                    <option value="g">G</option>
                                    <option value="gg">GG</option>
                                    <option value="xgg">XGG</option>
                                    <option value="36">36</option>
                                    <option value="37">37</option>
                                    <option value="38">38</option>
                                    <option value="39">39</option>
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="42">42</option>
                                    <option value="43">43</option>
                                    <option value="44">44</option>
                                </select>
                            </div>

                            <div className="filtro">
                                <label htmlFor="filtro-condicao">Condição</label>
                                <select 
                                    id="filtro-condicao"
                                    value={filtroCondicao}
                                    onChange={(e) => setFiltroCondicao(e.target.value)}
                                >
                                    <option value="">Todas as condições</option>
                                    <option value="novo-etiqueta">Novo com etiqueta</option>
                                    <option value="novo-sem-etiqueta">Novo sem etiqueta</option>
                                    <option value="usado-perfeito">Usado - Perfeito</option>
                                    <option value="usado-bom">Usado - Bom estado</option>
                                    <option value="usado-regular">Usado - Estado regular</option>
                                </select>
                            </div>

                            <div className="filtro">
                                <label htmlFor="filtro-genero">Gênero</label>
                                <select 
                                    id="filtro-genero"
                                    value={filtroGenero}
                                    onChange={(e) => setFiltroGenero(e.target.value)}
                                >
                                    <option value="">Todos os gêneros</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="unissex">Unissex</option>
                                    <option value="infantil">Infantil</option>
                                </select>
                            </div>

                            <div className="filtro">
                                <label htmlFor="ordenacao">Ordenar por</label>
                                <select 
                                    id="ordenacao"
                                    value={ordenacao}
                                    onChange={(e) => setOrdenacao(e.target.value)}
                                >
                                    <option value="recentes">Mais recentes</option>
                                    <option value="antigos">Mais antigos</option>
                                    <option value="alfabetica">Ordem alfabética</option>
                                </select>
                            </div>

                            <button 
                                type="button"
                                className="btn-limpar-filtros"
                                onClick={limparFiltros}
                            >
                                Limpar filtros
                            </button>
                        </div>
                    </section>

                    {/* Grid de produtos */}
                    {produtosFiltrados.length === 0 ? (
                        <section className="empty-state">
                            <div className="empty-icon">📦</div>
                            <h3>Nenhum produto encontrado</h3>
                            <p>
                                Não encontramos produtos nesta categoria com os filtros selecionados. 
                                Tente ajustar os filtros ou explore outras categorias.
                            </p>
                            <div className="empty-actions">
                                <button 
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={limparFiltros}
                                >
                                    Limpar filtros
                                </button>
                                <Link to="/" className="btn btn-primary">
                                    Explorar todos os produtos
                                </Link>
                            </div>
                        </section>
                    ) : (
                        <section className="produtos-grid">
                            {produtosFiltrados.map((produto) => (
                                <div 
                                    key={produto.id}
                                    onClick={(e) => handleProdutoClick(produto.id, e)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <ProdutoCard produto={produto} />
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </main>

            {/* Modal de Autenticação */}
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                message="Para ver os detalhes deste produto e interagir com outros usuários, você precisa fazer login na sua conta."
                title="Login Necessário"
            />
        </>
    );
};

export default CategoriaPage;