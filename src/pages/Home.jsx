import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProdutoCard from '../components/ProdutoCard';
import '../styles/Home.css';
import '../styles/ProdutoCard.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Componente específico para cards de categoria
const CategoriaCard = ({ categoria }) => {
    return (
        <div className="categoria-card">
            <div className="categoria-fotos">
                <img src={categoria.img} alt={categoria.nome} />
            </div>
            <div className="categoria-info">
                <h3>{categoria.nome}</h3>
                <p className="categoria-descricao">{categoria.descricao}</p>
            </div>
        </div>
    );
};

export default function Home({ produtos = [] }) {
    const [termoBusca, setTermoBusca] = useState('');
    const [resultadosBusca, setResultadosBusca] = useState([]);
    const [mostrandoResultadosBusca, setMostrandoResultadosBusca] = useState(false);

    const categorias = [
        { id: 1, nome: "Verão", categoria: "verao", img: "/img/verao.jpeg", descricao: "Roupas leves e frescas" },
        { id: 2, nome: "Inverno", categoria: "inverno", img: "/img/inverno.jpeg", descricao: "Roupas quentinhas" },
        { id: 3, nome: "Feminino", categoria: "feminino", img: "/img/feminino.jpeg", descricao: "Moda feminina" },
        { id: 4, nome: "Masculino", categoria: "masculino", img: "/img/masculino.jpeg", descricao: "Moda masculina" },
        { id: 5, nome: "Infantil", categoria: "infantil", img: "/img/infantil.jpeg", descricao: "Roupas para crianças" },
        { id: 6, nome: "Calçados", categoria: "calcados", img: "/img/calcados.jpeg", descricao: "Sapatos e tênis" }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    // FUNÇÃO DE BUSCA CORRIGIDA COM VERIFICAÇÃO DE PROPRIEDADES
    const realizarBusca = (termo) => {
        if (!termo.trim()) {
            setResultadosBusca([]);
            setMostrandoResultadosBusca(false);
            return;
        }

        const termoLower = termo.toLowerCase();
        
        const resultados = produtos.filter(produto => {
            // Verifica se o produto existe e tem as propriedades necessárias
            if (!produto) return false;
            
            // Função auxiliar para verificar se uma string contém o termo de busca
            const contemTermo = (valor) => {
                return valor && typeof valor === 'string' && valor.toLowerCase().includes(termoLower);
            };
            
            return (
                contemTermo(produto.titulo) ||
                contemTermo(produto.descricao) ||
                contemTermo(produto.categoria) ||
                contemTermo(produto.localizacao) ||
                contemTermo(produto.marca) ||
                contemTermo(produto.cor) ||
                contemTermo(produto.tamanho) ||
                contemTermo(produto.condicao)
            );
        });

        setResultadosBusca(resultados);
        setMostrandoResultadosBusca(true);
    };

    const handleBuscaChange = (e) => {
        const termo = e.target.value;
        setTermoBusca(termo);
        
        // Só busca se o termo tiver pelo menos 2 caracteres
        if (termo.length >= 2) {
            realizarBusca(termo);
        } else if (termo.length === 0) {
            // Limpa os resultados se o campo estiver vazio
            setResultadosBusca([]);
            setMostrandoResultadosBusca(false);
        }
    };

    const limparBusca = () => {
        setTermoBusca('');
        setResultadosBusca([]);
        setMostrandoResultadosBusca(false);
    };

    return (
        <>
            <Header />
            
            <main className="principal">
                <section className="hero">
                    <div className="container">
                        <h1 className="hero-title">Transforme sua Moda</h1>
                        <p className="hero-subtitle">
                            Compre, venda e troque roupas de forma sustentável. 
                            Dê uma segunda vida às suas peças favoritas!
                        </p>
                        
                        <div className="hero-search">
                            <div className="search-container">
                                <input 
                                    type="text" 
                                    placeholder="Busque por roupas, categoria, localização..."
                                    className="search-input"
                                    value={termoBusca}
                                    onChange={handleBuscaChange}
                                />
                                {termoBusca && (
                                    <button 
                                        className="clear-search-btn"
                                        onClick={limparBusca}
                                        title="Limpar busca"
                                    >
                                        ✕
                                    </button>
                                )}
                                <button 
                                    className="search-btn" 
                                    onClick={() => realizarBusca(termoBusca)}
                                    disabled={!termoBusca.trim()}
                                >
                                    🔍
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {mostrandoResultadosBusca && (
                    <section className="secao_produtos busca-resultados">
                        <div className="container">
                            <div className="busca-header">
                                <h2>
                                    Resultados para "{termoBusca}" 
                                    <span className="resultado-count">
                                        ({resultadosBusca.length} {resultadosBusca.length === 1 ? 'resultado' : 'resultados'})
                                    </span>
                                </h2>
                                <button className="btn-limpar-busca" onClick={limparBusca}>
                                    Limpar busca
                                </button>
                            </div>
                            
                            {resultadosBusca.length === 0 ? (
                                <div className="no-results">
                                    <p>Nenhum produto encontrado para sua busca.</p>
                                    <p>Tente buscar por outros termos ou explore nossas categorias.</p>
                                </div>
                            ) : (
                                <div className="produtos-grid">
                                    {resultadosBusca.map(produto => (
                                        <Link to={`/produto/${produto.id}`} className="item-link" key={produto.id}>
                                            <ProdutoCard produto={produto} />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {!mostrandoResultadosBusca && (
                    <>
                        <section className="secao_produtos destaque">
                            <div className="container">
                                <h2>Categorias</h2>
                                <div className="carrossel-categorias">
                                    <Slider {...settings}>
                                        {categorias.map((cat) => (
                                            <div key={cat.id}>
                                                <Link to={`/categorias/${cat.categoria}`} className="item-link">
                                                    <CategoriaCard categoria={cat} />
                                                </Link>
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </section>

                        <section className="secao_produtos">
                            <div className="container">
                                <h2>Itens Recém Adicionados</h2>
                                {produtos.length === 0 ? (
                                    <p className="no-products-message">Nenhum produto disponível no momento. Que tal ser o primeiro a publicar?</p>
                                ) : (
                                    <div className="carrossel-dinamico">
                                        <Slider {...settings}>
                                            {produtos
                                                .slice().reverse()
                                                .map(produto => (
                                                    <div key={produto.id}>
                                                        <Link to={`/produto/${produto.id}`} className="item-link">
                                                            <ProdutoCard produto={produto} />
                                                        </Link>
                                                    </div>
                                                ))}
                                        </Slider>
                                    </div>
                                )}
                            </div>
                        </section>
                    </>
                )}
            </main>
            
            <Footer />
        </>
    );
}