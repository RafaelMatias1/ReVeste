import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/globals.css'; // <--- CORRIGIDO: Removido o underscore aqui
// Importe suas imagens do public/img (AJUSTE ESTES CAMINHOS SE NECESSÁRIO)
// Caminho esperado: public/img/image (16).png, public/img/coracao.png, public/img/fotoperfil.jpeg
import logo from '../components/img/image (16).png'; // <--- EX: Se image (16).png está em public/img, o caminho correto é /img/image (16).png
import coracao from '../components/img/coracao.png'; // <--- O caminho DEVE ser /img/coracao.png
import fotoperfil from '../components/img/fotoperfil.jpeg'; // <--- O caminho DEVE ser /img/fotoperfil.jpeg


const Header = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <header className="cabecalho">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Ícone de cabide" />
                        <h1>ReVeste</h1>
                    </Link>
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
    );
};

export default Header;