import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Importe seus componentes de layout (ASSUMIMOS QUE ESTES JÁ EXISTEM E ESTÃO CORRETOS)
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProdutoCard from '../components/ProdutoCard'; // ESTE DEVE EXISTIR E ESTAR CORRETO (em src/components)

// Importe seus estilos
import '../styles/Home.css';
import '../styles/ProdutoCard.css'; // ESTE DEVE EXISTIR E ESTAR CORRETO (em src/styles)

// Caminhos de Imagem Centralizados (AGORA APONTAM PARA A PASTA PUBLIC/IMG)
// **ATENÇÃO:** CERTIFIQUE-SE DE QUE ESTES ARQUIVOS EXISTAM NA SUA PASTA `public/img/`
const IMAGES = {
    // Se você renomeou 'image (16).png' para 'logo_main.png', use '/img/logo_main.png'
    logo: "/img/logo_main.png", // OU "/img/image (16).png" SE NÃO RENOMEAR
    coracao: "/img/coracao.png",
    fotoperfil: "/img/fotoperfil.jpeg",
    // As outras imagens agora apontam para public/img/
    vestidofem: "/img/vestidofem.jpeg",
    blusaMasc: "/img/BlusaMasc.jpeg",
    vansMasc: "/img/VansMasc.jpeg",
    inverno: "/img/inverno.jpeg",
    veraotop: "/img/Veraotop.jpeg",
    infantil: "/img/infantil.jpeg",
    moletomMarrom: "/img/MoletomMarrom.jpeg",
    calcamole: "/img/Calcamole.jpeg",
    jaqwueta: "/img/jaqwueta.jpeg",
    jaquetaInverno: "/img/JaquetaInverno.jpeg",
    vestidoVerde: "/img/vestidoverde.jpeg",
    blusaBranca: "/img/blusabranca.jpeg",
    vestidoCreme: "/img/vestidocreme.jpeg",
    tenisAllStart: "/img/tenisallstart.jpeg",
    // Se você tem essas imagens, mova-as para public/img/
    blusaVerao: "/img/blusa-verao.jpeg",
    shortsVerao: "/img/shorts-verao.jpeg",
    sandaliaVerao: "/img/sandalia-verao.jpeg",
    camisetaInfantil: "/img/camiseta-infantil.jpeg",
    calcaInfantil: "/img/calca-infantil.jpeg",
    tenisInfantil: "/img/tenis-infantil.jpeg",
    // O placeholder.png DEVE ESTAR EM public/img/
    placeholder: "/img/placeholder.png",
    // Outras imagens que você mencionou:
    logoreveste2: "/img/logoreveste2.jpg",
    MoletomAzul: "/img/MoletomAzul.jpeg",
};


// Seus dados estáticos de categorias
const categorias = [
    { nome: "Feminino", img: IMAGES.vestidofem, id: 'cat-fem', descricao: 'Roupas e acessórios femininos', categoria: 'feminino' },
    { nome: "Blusa Masculina", img: IMAGES.blusaMasc, id: 'cat-masc', descricao: 'Blusas e camisetas masculinas', categoria: 'masculino' },
    { nome: "Sapatos", img: IMAGES.vansMasc, id: 'cat-sap', descricao: 'Diversos tipos de calçados', categoria: 'calçados' },
    { nome: "Inverno", img: IMAGES.inverno, id: 'cat-inv', descricao: 'Peças quentes para o inverno', categoria: 'inverno' },
    { nome: "Verão", img: IMAGES.veraotop, id: 'cat-ver', descricao: 'Roupas leves para o verão', categoria: 'verao' },
    { nome: "Infantil", img: IMAGES.infantil, id: 'cat-inf', descricao: 'Moda para crianças de todas as idades', categoria: 'infantil' },
];

// Dados estáticos de produtos (simplificados)
const produtosInverno = [
    { nome: "Casaco Marrom P", img: IMAGES.moletomMarrom, id: 'inverno-1', categoria: 'casacos', tamanho: 'P', condicao: 'novo', localizacao: 'São Paulo', descricao: 'Moletom de lã, super quentinho e confortável.', genero: 'masculino', dataPublicacao: '2024-01-01' },
    { nome: "Calça de moletom", img: IMAGES.calcamole, id: 'inverno-2', categoria: 'calças', tamanho: 'M', condicao: 'usado', localizacao: 'Rio de Janeiro', descricao: 'Calça de moletom cinza, ideal para o dia a dia.', genero: 'unissex', dataPublicacao: '2024-01-02' },
    { nome: "Jaqueta de couro", img: IMAGES.jaqwueta, id: 'inverno-3', categoria: 'jaquetas', tamanho: 'G', condicao: 'usado', localizacao: 'Belo Horizonte', descricao: 'Jaqueta preta de couro sintético, com zíper.', genero: 'feminino', dataPublicacao: '2024-01-03' },
    { nome: "Casaco Inverno", img: IMAGES.jaquetaInverno, id: 'inverno-4', categoria: 'casacos', tamanho: 'GG', condicao: 'novo', localizacao: 'Curitiba', descricao: 'Casaco quente para neve', genero: 'masculino', dataPublicacao: '2024-01-04' },
];

const produtosFeminino = [
    { nome: "Vestido Verde", img: IMAGES.vestidoVerde, id: 'feminino-1', categoria: 'vestidos', tamanho: 'P', condicao: 'usado', localizacao: 'Florianópolis', descricao: 'Vestido de festa curto, com detalhes em renda.', genero: 'feminino', dataPublicacao: '2024-01-05' },
    { nome: "Blusa Branca", img: IMAGES.blusaBranca, id: 'feminino-2', categoria: 'blusas', tamanho: 'M', condicao: 'novo', localizacao: 'São Paulo', descricao: 'Blusa social de seda, elegante e versátil.', genero: 'feminino', dataPublicacao: '2024-01-06' },
    { nome: "Vestido Creme", img: IMAGES.vestidoCreme, id: 'feminino-3', categoria: 'vestidos', tamanho: 'G', condicao: 'usado', localizacao: 'Rio de Janeiro', descricao: 'Vestido casual longo, com estampa sutil.', genero: 'feminino', dataPublicacao: '2024-01-07' },
    { nome: "Tênis All Star", img: IMAGES.tenisAllStart, id: 'feminino-4', categoria: 'calcados', tamanho: '36', condicao: 'usado', localizacao: 'Belo Horizonte', descricao: 'Tênis clássico All Star, preto e branco.', genero: 'feminino', dataPublicacao: '2024-01-08' },
];

const produtosVerao = [
    { nome: "Blusa de Verão", img: IMAGES.blusaVerao, id: 'verao-1', categoria: 'blusas', tamanho: 'P', condicao: 'novo', localizacao: 'Salvador', descricao: 'Blusa leve e florida, ideal para dias quentes.', genero: 'feminino', dataPublicacao: '2024-01-09' },
    { nome: "Shorts Jeans", img: IMAGES.shortsVerao, id: 'verao-2', categoria: 'shorts', tamanho: '38', condicao: 'usado', localizacao: 'Recife', descricao: 'Shorts jeans curto, com desfiados na barra.', genero: 'feminino', dataPublicacao: '2024-01-10' },
    { nome: "Sandália Plataforma", img: IMAGES.sandaliaVerao, id: 'verao-3', categoria: 'calcados', tamanho: '37', condicao: 'usado-perfeito', localizacao: 'Fortaleza', descricao: 'Sandália com salto plataforma, cor neutra.', genero: 'feminino', dataPublicacao: '2024-01-11' },
];

const produtosInfantil = [
    { nome: "Camiseta Infantil", img: IMAGES.camisetaInfantil, id: 'infantil-1', categoria: 'camisetas', tamanho: '6A', condicao: 'novo', localizacao: 'São Paulo', descricao: 'Camiseta de algodão com estampa de personagem.', genero: 'infantil', dataPublicacao: '2024-01-12' },
    { nome: "Calça Moletom Infantil", img: IMAGES.calcaInfantil, id: 'infantil-2', categoria: 'calças', tamanho: '4A', condicao: 'usado', localizacao: 'Rio de Janeiro', descricao: 'Calça de moletom macia, com elástico na cintura.', genero: 'infantil', dataPublicacao: '2024-01-13' },
    { nome: "Tênis Infantil", img: IMAGES.tenisInfantil, id: 'infantil-3', categoria: 'calcados', tamanho: '28', condicao: 'usado-bom', localizacao: 'Florianópolis', descricao: 'Tênis colorido e divertido, com cadarço elástico.', genero: 'infantil', dataPublicacao: '2024-01-14' },
];


function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{ ...style, display: "flex" }}
            onClick={onClick}
            aria-label="Anterior"
        >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="none"/>
                <path d="M19.5 24L13.5 16L19.5 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    );
}

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button
            className={className}
            style={{ ...style, display: "flex" }}
            onClick={onClick}
            aria-label="Próximo"
        >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="none"/>
                <path d="M12.5 8L18.5 16L12.5 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    );
}

export default function Home({ produtos }) {
    const { isAuthenticated, user } = useAuth();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            { breakpoint: 900, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <>
            <Header />
            <main>
                <section className="secao_busca">
                    <div className="container">
                        <input type="text" placeholder="Buscar por categoria ou produto..." />
                    </div>
                </section>

                <section className="secao_produtos destaque">
                    <div className="container">
                        <h2>Categorias</h2>
                        <div className="carrossel-categorias">
                            <Slider {...settings}>
                                {categorias.map((cat) => (
                                    <div key={cat.id}>
                                        <Link to={`/categorias/${cat.id}`} className="item-link">
                                            <ProdutoCard produto={{ 
                                                id: cat.id, 
                                                titulo: cat.nome, 
                                                fotos: [cat.img],
                                                descricao: cat.descricao,
                                                categoria: cat.nome,
                                                tamanho: 'N/A',
                                                condicao: 'N/A',
                                                localizacao: 'Geral',
                                                dataPublicacao: 'N/A'
                                            }} />
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

                <section className="secao_produtos">
                    <div className="container">
                        <h2>Mais procurados Inverno</h2>
                        <p className="no-products-message">Em breve, os itens mais procurados para o inverno aparecerão aqui!</p>
                    </div>
                </section>

                <section className="secao_produtos">
                    <div className="container">
                        <h2>Mais procurados Feminino</h2>
                        <p className="no-products-message">Em breve, os itens mais procurados na moda feminina aparecerão aqui!</p>
                    </div>
                </section>

                <section className="secao_produtos">
                    <div className="container">
                        <h2>Mais procurados Verão</h2>
                        <p className="no-products-message">Em breve, os itens mais procurados para o verão aparecerão aqui!</p>
                    </div>
                </section>

                <section className="secao_produtos">
                    <div className="container">
                        <h2>Mais procurados Infantil</h2>
                        <p className="no-products-message">Em breve, os itens mais procurados na moda infantil aparecerão aqui!</p>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}