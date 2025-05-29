import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import logo from "../components/img/image (16).png";
import coracao from "../components/img/coracao.png";
import fotoperfil from "../components/img/fotoperfil.jpeg";
import "../styles/Perfil.css";

export default function Perfil() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(() => {
    const usuario = user || JSON.parse(localStorage.getItem("usuarioReVeste")) || {};
    return {
      nome: usuario.nome || "",
      email: usuario.email || "",
      telefone: usuario.telefone || "",
      sexo: usuario.sexo || "",
      senha: usuario.senha || "",
      cpf: usuario.cpf || "",
      nascimento: usuario.nascimento || "",
    };
  });
  const [salvo, setSalvo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
    setSalvo(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const usuarioAtualizado = {
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      sexo: form.sexo,
      senha: form.senha,
      cpf: form.cpf,
      nascimento: form.nascimento,
    };
    localStorage.setItem("usuarioReVeste", JSON.stringify(usuarioAtualizado));
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleDeleteAccount() {
    setShowModal(true);
  }

  function confirmDelete() {
    localStorage.removeItem("usuarioReVeste");
    localStorage.setItem("reVesteLogado", "false");
    logout();
    navigate("/registro");
  }

  function cancelDelete() {
    setShowModal(false);
  }

  return (
    <>
      <header className="cabecalho">
        <div className="container-cabecalho">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Ícone de cabide" />
              <h1>ReVeste</h1>
            </Link>
          </div>
          <nav className="menu_principal">
            <ul>
              <li>
                <Link to="/favoritos" aria-label="Favoritos">
                  <img src={coracao} alt="Ícone de coração" />
                </Link>
              </li>
              <li><Link to="/chat">Chat</Link></li>
              <li><Link to="/publicar">Publicar Item</Link></li>
              <li>
                <Link to="/perfil" className="menu_usuario">
                  <span>{form.nome}</span>
                  <img src={fotoperfil} alt={form.nome} />
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} style={{
                  background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, marginLeft: 18
                }}>Sair</button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="pagina-container perfil-novo">
        <aside className="menu-lateral">
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/perfil" className="ativo">Perfil</Link></li>
            <li><Link to="/chat">Chat</Link></li>
            <li><Link to="/favoritos">Favoritos</Link></li>
          </ul>
        </aside>

        <main className="secao_conteudo_perfil perfil-main-novo">
          <div className="perfil-avatar-novo">
            <img src={fotoperfil} alt={form.nome} />
            <h2>{form.nome}</h2>
            <span className="perfil-email">{form.email}</span>
          </div>
          <form className="form-perfil perfil-form-novo" onSubmit={handleSubmit}>
            <div className="perfil-form-row">
              <div className="perfil-form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" value={form.nome} onChange={handleChange} />
              </div>
              <div className="perfil-form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" value={form.email} onChange={handleChange} />
              </div>
            </div>
            <div className="perfil-form-row">
              <div className="perfil-form-group">
                <label htmlFor="telefone">Telefone</label>
                <input type="tel" id="telefone" value={form.telefone} onChange={handleChange} />
              </div>
              <div className="perfil-form-group">
                <label htmlFor="sexo">Sexo</label>
                <select id="sexo" value={form.sexo} onChange={handleChange}>
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
            <div className="perfil-form-row">
              <div className="perfil-form-group">
                <label htmlFor="cpf">CPF</label>
                <input type="text" id="cpf" value={form.cpf} onChange={handleChange} />
              </div>
              <div className="perfil-form-group">
                <label htmlFor="nascimento">Data de nascimento</label>
                <input type="date" id="nascimento" value={form.nascimento} onChange={handleChange} />
              </div>
            </div>
            <div className="perfil-form-row">
              <div className="perfil-form-group">
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" value={form.senha} onChange={handleChange} />
              </div>
            </div>
            <div className="perfil-form-actions">
              <button type="submit" className="botao-salvar">
                Salvar alterações
              </button>
              <button
                type="button"
                className="botao-sair"
                onClick={handleLogout}
                style={{ marginLeft: 12 }}
              >
                Sair
              </button>
              <button
                type="button"
                className="botao-apagar"
                onClick={handleDeleteAccount}
                style={{ marginLeft: 12 }}
              >
                Apagar conta
              </button>
              {salvo && <span className="perfil-salvo-msg">Alterações salvas!</span>}
            </div>
          </form>
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Tem certeza?</h3>
                <p>Deseja realmente apagar sua conta? Esta ação não poderá ser desfeita.</p>
                <div className="modal-actions">
                  <button className="botao-apagar" onClick={confirmDelete}>Sim, apagar</button>
                  <button className="botao-sair" onClick={cancelDelete}>Cancelar</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <footer className="rodape">
        <p>&copy; 2025 ReVeste - Todos os direitos reservados.</p>
      </footer>
    </>
  );
}

