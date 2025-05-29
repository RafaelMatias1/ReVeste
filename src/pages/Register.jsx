import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import logo from "../components/img/image (16).png";
import coracao from "../components/img/coracao.png";
import fotoperfil from "../components/img/fotoperfil.jpeg";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmaSenha: ""
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.senha !== form.confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    // Salva usuário no localStorage (simples)
    localStorage.setItem(
      "usuarioReVeste",
      JSON.stringify({
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        senha: form.senha
      })
    );
    login(); // Marca como logado
    navigate("/"); // Redireciona para Home
  }

  return (
    <>
      <header className="cabecalho">
        <div className="container-cabecalho">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Ícone de cabide" />
              <h1>ReVeste</h1>
            </a>
          </div>
          <nav className="menu_principal">
            <ul>
              <li>
                <a href="/favoritos" aria-label="Favoritos">
                  <img src={coracao} alt="Ícone de coração" />
                </a>
              </li>
              <li><a href="/chat">Chat</a></li>
              <li><a href="/publicar">Publicar Item</a></li>
              <li>
                <a href="/login" className="menu_usuario">
                  <span>Entrar</span>
                  <img src={fotoperfil} alt="Foto de Perfil" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-cadastro-novo">
        <div className="card-cadastro-novo">
          <h2 className="titulo-cadastro-novo">Crie sua conta</h2>
          <p className="subtitulo-cadastro-novo">
            Preencha os campos abaixo para começar a usar o ReVeste.
          </p>
          <form className="form-cadastro-novo" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="nome">Nome completo</label>
              <input type="text" id="nome" value={form.nome} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="telefone">Telefone</label>
              <input type="tel" id="telefone" value={form.telefone} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" value={form.senha} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="confirmaSenha">Confirme a senha</label>
              <input type="password" id="confirmaSenha" value={form.confirmaSenha} onChange={handleChange} required />
            </div>
            <button type="submit" className="botao-cadastro-novo">Cadastrar</button>
            <p className="cadastro-link-login">
              Já tem conta? <a href="/login">Entrar</a>
            </p>
          </form>
        </div>
      </main>

      <footer className="rodape">
        <div className="container">
          <p>&copy; 2025 ReVeste - Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}