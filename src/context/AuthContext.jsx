import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Lê do localStorage ao iniciar
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("reVesteLogado") === "true";
  });

  const [user, setUser] = useState(() => {
    const usuario = localStorage.getItem("usuarioReVeste");
    return usuario ? JSON.parse(usuario) : null;
  });

  // FUNÇÃO DE LOGIN CORRIGIDA
  function login(email, senha) {
    // Verifica se existe usuário cadastrado
    const usuarioSalvo = localStorage.getItem("usuarioReVeste");
    
    if (!usuarioSalvo) {
      return false; // Nenhum usuário cadastrado
    }

    const usuario = JSON.parse(usuarioSalvo);
    
    // Verifica credenciais
    if (usuario.email === email && usuario.senha === senha) {
      setIsAuthenticated(true);
      localStorage.setItem("reVesteLogado", "true");
      setUser(usuario);
      return true;
    }
    
    return false; // Credenciais incorretas
  }

  // NOVA FUNÇÃO DE REGISTRO
  function register(nome, email, senha) {
    try {
      // Verifica se já existe um usuário com esse email
      const usuarioExistente = localStorage.getItem("usuarioReVeste");
      
      if (usuarioExistente) {
        const usuario = JSON.parse(usuarioExistente);
        if (usuario.email === email) {
          return false; // Email já cadastrado
        }
      }

      // Cria novo usuário
      const novoUsuario = {
        nome,
        email,
        senha,
        telefone: '',
        sexo: '',
        cpf: '',
        nascimento: '',
        dataCadastro: new Date().toISOString()
      };

      // Salva no localStorage
      localStorage.setItem("usuarioReVeste", JSON.stringify(novoUsuario));
      
      // Faz login automaticamente após o registro
      setIsAuthenticated(true);
      localStorage.setItem("reVesteLogado", "true");
      setUser(novoUsuario);
      
      return true;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return false;
    }
  }

  // NOVA FUNÇÃO PARA ATUALIZAR USUÁRIO
  function updateUser(dadosAtualizados) {
    try {
      const usuarioAtualizado = { ...user, ...dadosAtualizados };
      localStorage.setItem("usuarioReVeste", JSON.stringify(usuarioAtualizado));
      setUser(usuarioAtualizado);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  }

  function logout() {
    setIsAuthenticated(false);
    localStorage.setItem("reVesteLogado", "false");
    setUser(null);
  }

  // Garante que o estado siga o localStorage se mudar em outra aba
  useEffect(() => {
    function syncAuth() {
      const logado = localStorage.getItem("reVesteLogado") === "true";
      setIsAuthenticated(logado);
      
      if (logado) {
        const usuario = localStorage.getItem("usuarioReVeste");
        setUser(usuario ? JSON.parse(usuario) : null);
      } else {
        setUser(null);
      }
    }
    
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      register, // ADICIONADA A FUNÇÃO REGISTER
      updateUser, // ADICIONADA A FUNÇÃO UPDATE USER
      logout, 
      user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}