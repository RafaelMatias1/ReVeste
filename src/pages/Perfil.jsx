import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
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
  const [erros, setErros] = useState({});

  function handleChange(e) {
    const { id, value } = e.target;
    if (id === "cpf") {
      // Permite apenas números e limita a 11 dígitos
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);
      setForm({ ...form, cpf: onlyNumbers });
    } else if (id === "nascimento") {
      setForm({ ...form, nascimento: value });
    } else {
      setForm({ ...form, [id]: value });
    }
    setSalvo(false);
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  }

  function validarNascimento(data) {
    if (!data) return false;
    const hoje = new Date();
    const nascimento = new Date(data);
    if (nascimento > hoje) return false;
    if (nascimento.getFullYear() < 1900) return false;
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const novosErros = {};
    if (!validarCPF(form.cpf)) {
      novosErros.cpf = 'CPF inválido';
    }
    if (!validarNascimento(form.nascimento)) {
      novosErros.nascimento = 'Data de nascimento inválida';
    }
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }
    setErros({});
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
    <PageLayout 
      title="Perfil" 
      subtitle="Gerencie suas informações"
      className="perfil-page"
    >
      <div className="perfil-content">
        <div className="perfil-avatar-novo">
          <img src="/img/fotoperfil.jpeg" alt={form.nome} />
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
              <input type="text" id="cpf" value={form.cpf} onChange={handleChange} maxLength={11} pattern="\d{11}" />
              {erros.cpf && <span className="erro-campo">{erros.cpf}</span>}
            </div>
            <div className="perfil-form-group">
              <label htmlFor="nascimento">Data de nascimento</label>
              <input type="date" id="nascimento" value={form.nascimento} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
              {erros.nascimento && <span className="erro-campo">{erros.nascimento}</span>}
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
              Salvar
            </button>
            <button
              type="button"
              className="botao-sair"
              onClick={handleLogout}
            >
              Sair
            </button>
            <button
              type="button"
              className="botao-apagar"
              onClick={handleDeleteAccount}
            >
              Apagar conta
            </button>
            {salvo && <span className="perfil-salvo-msg">Salvo!</span>}
          </div>
        </form>
        
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Confirmar exclusão</h3>
              <p>Deseja realmente apagar sua conta? Esta ação não pode ser desfeita.</p>
              <div className="modal-actions">
                <button className="botao-apagar" onClick={confirmDelete}>Confirmar</button>
                <button className="botao-sair" onClick={cancelDelete}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

