import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../components/img/image (16).png";
import coracao from "../components/img/coracao.png";
import fotoperfil from "../components/img/fotoperfil.jpeg";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const usuario = JSON.parse(localStorage.getItem("usuarioReVeste"));
    if (
      usuario &&
      (usuario.email === form.email || usuario.nome === form.email) &&
      usuario.senha === form.senha
    ) {
      login();
      navigate("/");
    } else {
      alert("Usuário ou senha inválidos!");
    }
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
                <a href="/Registro" className="menu_usuario">
                  <span>Cadastre-se</span>
                  <img src={fotoperfil} alt="Foto de Perfil" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-login-novo">
        <div className="card-login-novo">
          <h2 className="titulo-login-novo">Acesse sua conta</h2>
          <p className="subtitulo-login-novo">
            Bem-vindo(a) de volta ao ReVeste!
          </p>
          <form className="form-login-novo" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">E-mail ou usuário</label>
              <input type="text" id="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" value={form.senha} onChange={handleChange} required />
            </div>
            <div className="login-opcoes">
              <div className="checkbox-lembrar">
                <input type="checkbox" id="lembrar-me" />
                <label htmlFor="lembrar-me">Lembrar-me</label>
              </div>
              <a href="#" className="link-esqueceu-senha">Esqueceu a senha?</a>
            </div>
            <button type="submit" className="botao-login-novo">Entrar</button>
            <p className="login-link-cadastro">
              Não tem conta? <a href="/registro">Cadastre-se</a>
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