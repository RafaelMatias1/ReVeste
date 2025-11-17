import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Lê do localStorage ao iniciar (com verificação se está no browser)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("reVesteLogado") === "true";
    }
    return false;
  });

  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const usuario = localStorage.getItem("usuarioReVeste");
      return usuario ? JSON.parse(usuario) : null;
    }
    return null;
  });

  // FUNÇÃO DE LOGIN (COM API)
  async function login(email, senha) {
    try {
      // Tenta fazer login via API (backend espera 'password' ao invés de 'senha')
      const response = await authAPI.login({ email, password: senha });
      
      if (response.token) {
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem("reVesteLogado", "true");
          localStorage.setItem("usuarioReVeste", JSON.stringify(response.user));
        }
        setUser(response.user);
        return { success: true };
      }
      
      return { success: false, message: 'Credenciais inválidas' };
    } catch (error) {
      // Se API falhar, tenta com localStorage (fallback)
      console.warn('API indisponível, usando localStorage', error);
      
      if (typeof window === 'undefined') {
        return { success: false, message: 'Erro ao fazer login' };
      }
      
      const usuarioSalvo = localStorage.getItem("usuarioReVeste");
      
      if (!usuarioSalvo) {
        return { success: false, message: 'Nenhum usuário cadastrado' };
      }

      const usuario = JSON.parse(usuarioSalvo);
      
      if (usuario.email === email && usuario.senha === senha) {
        setIsAuthenticated(true);
        localStorage.setItem("reVesteLogado", "true");
        setUser(usuario);
        return { success: true };
      }
      
      return { success: false, message: 'Credenciais incorretas' };
    }
  }

  // FUNÇÃO DE REGISTRO (COM API)
  async function register(nome, email, senha) {
    try {
      // Tenta registrar via API (backend espera 'password' ao invés de 'senha')
      const response = await authAPI.register({ nome, email, password: senha });
      
      if (response.token) {
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem("reVesteLogado", "true");
          localStorage.setItem("usuarioReVeste", JSON.stringify(response.user));
        }
        setUser(response.user);
        return { success: true };
      }
      
      return { success: false, message: 'Erro ao registrar' };
    } catch (error) {
      // Se API falhar, usa localStorage (fallback)
      console.warn('API indisponível, usando localStorage', error);
      
      if (typeof window === 'undefined') {
        return { success: false, message: 'Erro ao registrar' };
      }
      
      try {
        const usuarioExistente = localStorage.getItem("usuarioReVeste");
        
        if (usuarioExistente) {
          const usuario = JSON.parse(usuarioExistente);
          if (usuario.email === email) {
            return { success: false, message: 'Email já cadastrado' };
          }
        }

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

        localStorage.setItem("usuarioReVeste", JSON.stringify(novoUsuario));
        
        setIsAuthenticated(true);
        localStorage.setItem("reVesteLogado", "true");
        setUser(novoUsuario);
        
        return { success: true };
      } catch (localError) {
        console.error('Erro ao registrar usuário:', localError);
        return { success: false, message: 'Erro ao registrar' };
      }
    }
  }

  // FUNÇÃO PARA ATUALIZAR USUÁRIO
  async function updateUser(dadosAtualizados) {
    try {
      // Se tiver ID, tenta atualizar via API
      if (user?.id) {
        const response = await authAPI.updateProfile(user.id, dadosAtualizados);
        if (response.user) {
          setUser(response.user);
          return { success: true };
        }
      }
      
      // Fallback para localStorage
      const usuarioAtualizado = { ...user, ...dadosAtualizados };
      if (typeof window !== 'undefined') {
        localStorage.setItem("usuarioReVeste", JSON.stringify(usuarioAtualizado));
      }
      setUser(usuarioAtualizado);
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return { success: false, message: 'Erro ao atualizar perfil' };
    }
  }

  // FUNÇÃO PARA DELETAR CONTA
  async function deleteAccount() {
    try {
      // Se tiver ID, tenta deletar via API
      if (user?.id) {
        await authAPI.deleteAccount(user.id);
      }
      
      // Limpar estado e localStorage
      setIsAuthenticated(false);
      setUser(null);
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem("reVesteLogado");
        localStorage.removeItem("usuarioReVeste");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar conta:', error);
      return { success: false, message: 'Erro ao deletar conta' };
    }
  }

  function logout() {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem("reVesteLogado", "false");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setUser(null);
  }

  // Garante que o estado siga o localStorage se mudar em outra aba
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
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
      register,
      updateUser,
      deleteAccount,
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