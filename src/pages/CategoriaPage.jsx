import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProdutoCard from '../components/ProdutoCard';
import '../styles/CategoriaPage.css';

const CategoriaPage = ({ produtos = [] }) => {
    const { categoria } = useParams();
    const [filtroTamanho, setFiltroTamanho] = useState('');
    const [filtroCondicao, setFiltroCondicao] = useState('');
    const [filtroGenero, setFiltroGenero] = useState('');
    const [ordenacao, setOrdenacao] = useState('recentes');

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
        let produtosDaCategoria = produtos;

        // Filtrar por categoria
        if (categoria && categoria !== 'todos') {
            const categoriasPermitidas = categoriasMap[categoria] || [categoria];
            produtosDaCategoria = produtos.filter(produto => 
                categoriasPermitidas.includes(produto.categoria) ||
                produto.genero === categoria ||
                (categoria === 'inverno' && ['casacos', 'jaquetas', 'moletom'].includes(produto.categoria)) ||
                (categoria === 'verao' && ['vestidos', 'blusas', 'shorts', 'regatas'].includes(produto.categoria))
            );
        }

        // Aplicar filtros adicionais
        if (filtroTamanho) {
            produtosDaCategoria = produtosDaCategoria.filter(produto => 
                produto.tamanho.toLowerCase().includes(filtroTamanho.toLowerCase())
            );
        }

        if (filtroCondicao) {
            produtosDaCategoria = produtosDaCategoria.filter(produto => 
                produto.condicao === filtroCondicao
            );
        }

        if (filtroGenero) {
            produtosDaCategoria = produtosDaCategoria.filter(produto => 
                produto.genero === filtroGenero
            );
        }

        // Ordenar produtos
        switch (ordenacao) {
            case 'recentes':
                return produtosDaCategoria.sort((a, b) => 
                    new Date(b.dataPublicacao) - new Date(a.dataPublicacao)
                );
            case 'antigos':
                return produtosDaCategoria.sort((a, b) => 
                    new Date(a.dataPublicacao) - new Date(b.dataPublicacao)
                );
            case 'alfabetica':
                return produtosDaCategoria.sort((a, b) => 
                    a.titulo.localeCompare(b.titulo)
                );
            default:
                return produtosDaCategoria;
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
            'calcas': 'Calças',
            'todos': 'Todos os Produtos'
        };
        return nomes[cat] || cat?.charAt(0).toUpperCase() + cat?.slice(1);
    };

    // Limpar todos os filtros
    const limparFiltros = () => {
        setFiltroTamanho('');
        setFiltroCondicao('');
        setFiltroGenero('');
        setOrdenacao('recentes');
    };

    return (
        <>
            <Header />
            <main className="main-categoria-page">
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <span>›</span>
                        <span>{getNomeCategoria(categoria)}</span>
                    </nav>

                    {/* Cabeçalho da categoria */}
                    <div className="categoria-header">
                        <h1>{getNomeCategoria(categoria)}</h1>
                        <p className="categoria-contador">
                            {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                        </p>
                    </div>

                    {/* Filtros e ordenação */}
                    <div className="filtros-container">
                        <div className="filtros-grupo">
                            <div className="filtro">
                                <label htmlFor="tamanho">Tamanho:</label>
                                <select 
                                    id="tamanho" 
                                    value={filtroTamanho} 
                                    onChange={(e) => setFiltroTamanho(e.target.value)}
                                >
                                    <option value="">Todos os tamanhos</option>
                                    <option value="PP">PP</option>
                                    <option value="P">P</option>
                                    <option value="M">M</option>
                                    <option value="G">G</option>
                                    <option value="GG">GG</option>
                                    <option value="36">36</option>
                                    <option value="38">38</option>
                                    <option value="40">40</option>
                                    <option value="42">42</option>
                                </select>
                            </div>

                            <div className="filtro">
                                <label htmlFor="condicao">Condição:</label>
                                <select 
                                    id="condicao" 
                                    value={filtroCondicao} 
                                    onChange={(e) => setFiltroCondicao(e.target.value)}
                                >
                                    <option value="">Todas as condições</option>
                                    <option value="novo-etiqueta">Novo com etiqueta</option>
                                    <option value="novo-sem-etiqueta">Novo sem etiqueta</option>
                                    <option value="usado-perfeito">Usado - Perfeito</option>
                                    <option value="usado-bom">Usado - Bom estado</option>
                                    <option value="usado-regular">Usado - Regular</option>
                                </select>
                            </div>

                            <div className="filtro">
                                <label htmlFor="genero">Gênero:</label>
                                <select 
                                    id="genero" 
                                    value={filtroGenero} 
                                    onChange={(e) => setFiltroGenero(e.target.value)}
                                >
                                    <option value="">Todos</option>
                                    <option value="feminino">Feminino</option>
                                    <option value="masculino">Masculino</option>
                                    <option value="unissex">Unissex</option>
                                </select>
                            </div>

                            <div className="filtro">
                                <label htmlFor="ordenacao">Ordenar por:</label>
                                <select 
                                    id="ordenacao" 
                                    value={ordenacao} 
                                    onChange={(e) => setOrdenacao(e.target.value)}
                                >
                                    <option value="recentes">Mais recentes</option>
                                    <option value="antigos">Mais antigos</option>
                                    <option value="alfabetica">A-Z</option>
                                </select>
                            </div>

                            <button 
                                className="btn-limpar-filtros"
                                onClick={limparFiltros}
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    </div>

                    {/* Grid de produtos */}
                    {produtosFiltrados.length > 0 ? (
                        <div className="produtos-grid">
                            {produtosFiltrados.map((produto) => (
                                <ProdutoCard key={produto.id} produto={produto} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">👕</div>
                            <h3>Nenhum produto encontrado</h3>
                            <p>
                                {categoria === 'todos' 
                                    ? 'Não há produtos cadastrados ainda.'
                                    : `Não há produtos na categoria "${getNomeCategoria(categoria)}" no momento.`
                                }
                            </p>
                            <div className="empty-actions">
                                <Link to="/" className="btn btn-outline">
                                    Voltar ao início
                                </Link>
                                <button 
                                    className="btn btn-primary"
                                    onClick={limparFiltros}
                                >
                                    Limpar filtros
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CategoriaPage;