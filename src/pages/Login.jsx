import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer'; // IMPORTAR O FOOTER COMPONENTE
import '../styles/Login.css';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });
    const [lembrarLogin, setLembrarLogin] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Simular autenticação
        const success = login(formData.email, formData.senha);
        
        if (success) {
            navigate('/');
        } else {
            alert('Email ou senha incorretos!');
        }
    };

    return (
        <div>
            {/* Header Simples para Login */}
            <header className="cabecalho">
                <div className="container-cabecalho">
                    <div className="logo">
                        <Link to="/">
                            <img src="/img/image (16).png" alt="Ícone de cabide" />
                            <h1>ReVeste</h1>
                        </Link>
                    </div>
                    <nav className="menu_principal">
                        <ul>
                            <li>
                                <Link to="/registro" className="btn-publicar">Criar Conta</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="main-login-novo">
                <div className="card-login-novo">
                    <h2 className="titulo-login-novo">Entrar na sua conta</h2>
                    <p className="subtitulo-login-novo">Acesse sua conta para continuar trocando roupas!</p>

                    <form className="form-login-novo" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Seu e-mail"
                                required 
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="senha">Senha</label>
                            <input 
                                type="password" 
                                id="senha" 
                                name="senha" 
                                value={formData.senha}
                                onChange={handleChange}
                                placeholder="Sua senha"
                                required 
                            />
                        </div>

                        <div className="login-opcoes">
                            <div className="checkbox-lembrar">
                                <input 
                                    type="checkbox" 
                                    id="lembrar" 
                                    checked={lembrarLogin}
                                    onChange={(e) => setLembrarLogin(e.target.checked)}
                                />
                                <label htmlFor="lembrar">Lembrar de mim</label>
                            </div>
                            <a href="#" className="link-esqueceu-senha">Esqueceu a senha?</a>
                        </div>

                        <button type="submit" className="botao-login-novo">
                            Entrar
                        </button>
                    </form>

                    <div className="login-link-cadastro">
                        Não tem uma conta? <Link to="/registro">Cadastre-se aqui</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}