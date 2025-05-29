import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Importando imagens
import vestidofem from "../components/img/vestidofem.jpeg";
import blusaMasc from "../components/img/BlusaMasc.jpeg";
import vansMasc from "../components/img/VansMasc.jpeg";
import inverno from "../components/img/inverno.jpeg";
import veraotop from "../components/img/Veraotop.jpeg";
import infantil from "../components/img/infantil.jpeg";
import moletomMarrom from "../components/img/MoletomMarrom.jpeg";
import calcamole from "../components/img/Calcamole.jpeg";
import jaqwueta from "../components/img/jaqwueta.jpeg";
import jaquetaInverno from "../components/img/JaquetaInverno.jpeg";
import vestidoVerde from "../components/img/vestidoverde.jpeg";
import blusaBranca from "../components/img/blusabranca.jpeg";
import vestidoCreme from "../components/img/vestidocreme.jpeg";
import tenisAllStart from "../components/img/tenisallstart.jpeg";
import coracao from "../components/img/coracao.png";
import fotoperfil from "../components/img/fotoperfil.jpeg";
import logo from "../components/img/image (16).png";

const categorias = [
  { nome: "Feminino", img: vestidofem },
  { nome: "Blusa Masculina", img: blusaMasc },
  { nome: "Sapatos", img: vansMasc },
  { nome: "Inverno", img: inverno },
  { nome: "Verão", img: veraotop },
  { nome: "Infantil", img: infantil },
];

const produtosInverno = [
  { nome: "Casaco Marrom P", img: moletomMarrom },
  { nome: "Calça de moletom", img: calcamole },
  { nome: "Jaqueta de couro", img: jaqwueta },
  { nome: "Casaco Inverno", img: jaquetaInverno },
];

const produtosFeminino = [
  { nome: "Vestido Verde", img: vestidoVerde },
  { nome: "Blusa Branca", img: blusaBranca },
  { nome: "Vestido Creme", img: vestidoCreme },
  { nome: "Tênis All Star", img: tenisAllStart },
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

export default function Home() {
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
      {/* Header */}
      <header className="cabecalho">
        <div className="container">
          <div className="logo">
            <img src={logo} alt="Ícone de cabide" />
            <h1>ReVeste</h1>
          </div>
          <nav className="menu_principal">
            <ul>
              {isAuthenticated && (
                <>
                  <li>
                    <Link to="/favoritos" aria-label="Favoritos">
                      <img src={coracao} alt="Ícone de coração" />
                    </Link>
                  </li>
                  <li><Link to="/chat">Chat</Link></li>
                  <li>
                    <Link to="/publicar" className="btn-publicar">Publicar Item</Link>
                  </li>
                  <li>
                    <Link to="/perfil" className="menu_usuario">
                      <span>{user ? user.nome : "Perfil"}</span>
                      <img src={fotoperfil} alt={user ? user.nome : "Foto de Perfil"} />
                    </Link>
                  </li>
                </>
              )}
              {!isAuthenticated && (
                <li>
                  <Link to="/login" className="btn-publicar">Entrar</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Busca */}
      <section className="secao_busca">
        <div className="container">
          <input type="text" placeholder="Buscar por categoria ou produto..." />
        </div>
      </section>

      {/* Carrossel de Categorias */}
      <section className="secao_produtos destaque">
        <div className="container">
          <h2>Categorias</h2>
          <div className="carrossel-categorias">
            <Slider {...settings}>
              {categorias.map((cat, idx) => (
                <div key={idx}>
                  <a href="/produto" className="item-link">
                    <div className="item_produto">
                      <img src={cat.img} alt={cat.nome} className="imagem_produto_fundo" />
                      <div className="info_produto">
                        <p className="nome_produto">{cat.nome}</p>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Seção Mais Procurados Inverno */}
      <section className="secao_produtos">
        <div className="container">
          <h2>Mais procurados Inverno</h2>
          <div className="lista_itens">
            {produtosInverno.map((prod, idx) => (
              <a href="/produto" className="item-link" key={idx}>
                <div className="item_produto">
                  <img src={prod.img} alt={prod.nome} className="imagem_produto_fundo" />
                  <div className="info_produto">
                    <p className="nome_produto">{prod.nome}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Mais Procurados Feminino */}
      <section className="secao_produtos">
        <div className="container">
          <h2>Mais procurados Feminino</h2>
          <div className="lista_itens">
            {produtosFeminino.map((prod, idx) => (
              <a href="/produto" className="item-link" key={idx}>
                <div className="item_produto">
                  <img src={prod.img} alt={prod.nome} className="imagem_produto_fundo" />
                  <div className="info_produto">
                    <p className="nome_produto">{prod.nome}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="rodape">
        <div className="container">
          <p>&copy; 2025 ReVeste - Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}