import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer'; // IMPORTAR O FOOTER COMPONENTE
import '../styles/Register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (formData.senha !== formData.confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        if (formData.senha.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        // Registrar usuário via API
        const result = await register(formData.nome, formData.email, formData.senha);
        
        if (result.success) {
            alert('Conta criada com sucesso!');
            navigate('/');
        } else {
            alert(result.message || 'Erro ao criar conta. Este email já pode estar cadastrado.');
        }
    };

    return (
        <div>
            {/* Header Simples para Register */}
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
                                <Link to="/login" className="btn-publicar">Entrar</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="main-cadastro-novo">
                <div className="card-cadastro-novo">
                    <h2 className="titulo-cadastro-novo">Criar uma conta</h2>
                    <p className="subtitulo-cadastro-novo">Junte-se à comunidade ReVeste!</p>

                    <form className="form-cadastro-novo" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="nome">Nome Completo</label>
                            <input 
                                type="text" 
                                id="nome" 
                                name="nome" 
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Seu nome completo"
                                required 
                            />
                        </div>

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
                                placeholder="Crie uma senha (mín. 6 caracteres)"
                                required 
                                minLength="6"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmarSenha">Confirmar Senha</label>
                            <input 
                                type="password" 
                                id="confirmarSenha" 
                                name="confirmarSenha" 
                                value={formData.confirmarSenha}
                                onChange={handleChange}
                                placeholder="Confirme sua senha"
                                required 
                            />
                        </div>

                        <button type="submit" className="botao-cadastro-novo">
                            Criar Conta
                        </button>
                    </form>

                    <div className="cadastro-link-login">
                        Já tem uma conta? <Link to="/login">Entre aqui</Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}