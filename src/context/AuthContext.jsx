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

  function login() {
    setIsAuthenticated(true);
    localStorage.setItem("reVesteLogado", "true");
    const usuario = localStorage.getItem("usuarioReVeste");
    setUser(usuario ? JSON.parse(usuario) : null);
  }
  function logout() {
    setIsAuthenticated(false);
    localStorage.setItem("reVesteLogado", "false");
    setUser(null);
  }

  // Garante que o estado siga o localStorage se mudar em outra aba
  useEffect(() => {
    function syncAuth() {
      setIsAuthenticated(localStorage.getItem("reVesteLogado") === "true");
    }
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}