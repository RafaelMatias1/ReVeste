import axios from 'axios';

// Base URL da API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Criar instância do axios com configurações padrão
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            // Token inválido ou expirado
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// ============= AUTENTICAÇÃO =============

export const authAPI = {
    // Registrar novo usuário
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        if (response.data.token && typeof window !== 'undefined') {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Fazer login
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.token && typeof window !== 'undefined') {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Fazer logout
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
    },

    // Obter usuário atual
    getCurrentUser: () => {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        }
        return null;
    },

    // Verificar se está autenticado
    isAuthenticated: () => {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('token');
        }
        return false;
    },

    // Atualizar perfil do usuário
    updateProfile: async (userId, userData) => {
        const response = await api.put(`/users/${userId}`, userData);
        // Atualizar usuário no localStorage
        if (typeof window !== 'undefined' && response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    // Deletar conta do usuário
    deleteAccount: async (userId) => {
        const response = await api.delete(`/users/${userId}`);
        // Limpar localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        return response.data;
    },
};

// ============= USUÁRIOS =============

export const userAPI = {
    // Obter perfil do usuário por ID
    getById: async (userId) => {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    },

    // Atualizar perfil (requer userId)
    updateProfile: async (userId, userData) => {
        const response = await api.put(`/users/${userId}`, userData);
        // Atualizar usuário no localStorage
        if (typeof window !== 'undefined') {
            const currentUser = authAPI.getCurrentUser();
            if (currentUser && currentUser.id === userId) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
        }
        return response.data;
    },

    // Deletar conta do usuário
    deleteAccount: async (userId) => {
        const response = await api.delete(`/users/${userId}`);
        // Limpar localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        return response.data;
    },
};

// ============= PRODUTOS =============

export const produtoAPI = {
    // Listar todos os produtos
    getAll: async (filters = {}) => {
        const params = new URLSearchParams();
        
        if (filters.categoria) params.append('categoria', filters.categoria);
        if (filters.condicao) params.append('condicao', filters.condicao);
        if (filters.tamanho) params.append('tamanho', filters.tamanho);
        if (filters.precoMin) params.append('precoMin', filters.precoMin);
        if (filters.precoMax) params.append('precoMax', filters.precoMax);
        if (filters.search) params.append('search', filters.search);
        
        const queryString = params.toString();
        const url = queryString ? `/produtos?${queryString}` : '/produtos';
        
        const response = await api.get(url);
        return response.data;
    },

    // Obter produto por ID
    getById: async (id) => {
        const response = await api.get(`/produtos/${id}`);
        return response.data;
    },

    // Criar novo produto
    create: async (produtoData) => {
        const response = await api.post('/produtos', produtoData);
        return response.data;
    },

    // Atualizar produto
    update: async (id, produtoData) => {
        const response = await api.put(`/produtos/${id}`, produtoData);
        return response.data;
    },

    // Deletar produto
    delete: async (id) => {
        const response = await api.delete(`/produtos/${id}`);
        return response.data;
    },

    // Obter produtos do usuário autenticado
    getMeusProdutos: async () => {
        const response = await api.get('/produtos/meus');
        return response.data;
    },

    // Adicionar/remover favorito
    toggleFavorite: async (id) => {
        const response = await api.post(`/produtos/${id}/favorite`);
        return response.data;
    },

    // Obter favoritos do usuário
    getFavoritos: async () => {
        const response = await api.get('/produtos/favoritos');
        return response.data;
    },
};

// ============= UTILIDADES =============

// Tratamento de erros
export const handleAPIError = (error) => {
    if (error.response) {
        // Erro de resposta do servidor
        const message = error.response.data.message || error.response.data.error || 'Erro no servidor';
        console.error('Erro API:', message);
        return message;
    } else if (error.request) {
        // Erro de rede
        console.error('Erro de rede:', error.request);
        return 'Erro de conexão. Verifique sua internet.';
    } else {
        // Erro desconhecido
        console.error('Erro:', error.message);
        return 'Erro inesperado. Tente novamente.';
    }
};

export default api;
