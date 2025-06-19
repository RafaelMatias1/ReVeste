# 🌱 ReVeste - Plataforma de Trocas Sustentáveis

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React%20Router-6-red.svg)](https://reactrouter.com/)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg)]()

**Transformando moda em sustentabilidade através da economia circular**

O ReVeste é uma plataforma web inovadora que conecta pessoas interessadas em trocar, doar ou adquirir roupas de forma sustentável, promovendo o consumo consciente e estendendo a vida útil das peças de vestuário.

## 🎯 Objetivo

Criar uma solução digital que combate o desperdício na indústria da moda, incentivando a reutilização de roupas através de uma plataforma intuitiva e segura para trocas entre usuários.

## ✨ Funcionalidades Implementadas

### 🔐 **Sistema de Autenticação Completo**
- Registro e login de usuários com validação
- Proteção de rotas com verificação de autenticação
- Gerenciamento de perfil de usuário
- Context API para estado global de autenticação

### 👕 **Gestão Avançada de Produtos**
- Cadastro de peças com upload de imagens
- Sistema de categorização (Feminino, Masculino, Infantil)
- Busca e filtros por categoria e características
- **Sistema de Favoritos** - Salvar produtos preferidos
- Visualização detalhada de cada produto

### 🤝 **Interação e Comunicação**
- **Modal de Contato** - Comunicação direta entre usuários
- **Integração WhatsApp** - Compartilhamento de produtos
- **Chat integrado** - Suporte categorizado por temas
- Sistema de cópia de e-mail para contato

### 🎨 **Interface e Experiência**
- **Design Responsivo** - Funciona em todos os dispositivos
- **Modais Informativos** - AuthModal, ContactModal, InfoModal
- **Header dinâmico** - Muda conforme estado de autenticação
- **Footer completo** - Links organizados e informativos
- Proteção de rotas com feedback visual

### 🛡️ **Segurança e Validação**
- **AuthCheck Component** - Verificação de autenticação
- Proteção contra acesso não autorizado
- Validação de formulários em tempo real
- Armazenamento seguro no localStorage

## 🚀 Tecnologias Utilizadas

### **Frontend**
- **React 18** - Biblioteca principal para construção da interface
- **React Router DOM** - Sistema de roteamento e navegação SPAs
- **Context API** - Gerenciamento de estado global (Auth, Favorites)
- **CSS3** - Estilização moderna com CSS Modules

### **Armazenamento**
- **LocalStorage** - Persistência de dados de usuário e favoritos
- **SessionStorage** - Dados temporários da sessão

### **Ferramentas**
- **Create React App** - Setup e configuração inicial
- **JavaScript ES6+** - Sintaxe moderna
- **SVG Icons** - Ícones vetorizados para melhor performance

## 📁 Estrutura Real do Projeto

```
ReVeste/
├── public/                 # Arquivos estáticos
│   ├── img/               # Imagens da aplicação
│   │   ├── image (16).png # Logo do cabeçalho
│   │   └── fotoperfil.jpeg # Foto padrão de perfil
│   ├── index.html         # Template HTML principal
│   └── manifest.json      # Configurações da PWA
├── src/                   # Código fonte da aplicação
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Header.jsx     # Cabeçalho com navegação
│   │   ├── Footer.jsx     # Rodapé com links e informações
│   │   ├── FavoriteButton.jsx # Botão de favoritar produtos
│   │   ├── ContactModal.jsx   # Modal para contato entre usuários
│   │   ├── AuthModal.jsx      # Modal de autenticação obrigatória
│   │   ├── AuthCheck.jsx      # Componente de verificação de auth
│   │   └── InfoModal.jsx      # Modal para informações gerais
│   ├── context/          # Contexts do React
│   │   ├── AuthContext.jsx    # Gerenciamento de autenticação
│   │   └── FavoritesContext.jsx # Gerenciamento de favoritos
│   ├── pages/            # Páginas da aplicação
│   │   ├── Home/         # Página inicial
│   │   ├── Login/        # Página de login/registro
│   │   ├── Profile/      # Perfil do usuário
│   │   ├── Products/     # Listagem e detalhes
│   │   ├── Favorites/    # Produtos favoritos
│   │   ├── Chat/         # Sistema de chat
│   │   └── About/        # Sobre nós
│   ├── styles/           # Estilos da aplicação
│   │   ├── globals.css   # Estilos globais
│   │   ├── AuthModal.css # Estilos do modal de auth
│   │   ├── ContactModal.css # Estilos do modal de contato
│   │   └── FavoriteButton.css # Estilos do botão favoritar
│   ├── App.jsx           # Componente raiz
│   └── index.js          # Ponto de entrada (ReactDOM)
├── package.json          # Dependências e scripts
└── README.md            # Este arquivo
```

## 🛠 Como Executar o Projeto

### **Pré-requisitos**
- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- npm (vem com Node.js)
- Git

### **Instalação e Execução**

1. **Clone o repositório**
```bash
git clone https://github.com/rafaelvelosoAZ/ReVeste.git
cd ReVeste
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute em modo de desenvolvimento**
```bash
npm start
```

4. **Acesse a aplicação**
```
http://localhost:3000
```

### **Build para Produção**
```bash
npm run build
```

## 📦 Scripts Disponíveis

- `npm start` - Executa o servidor de desenvolvimento
- `npm run build` - Gera build de produção otimizado
- `npm test` - Executa os testes
- `npm run eject` - Ejeta as configurações (irreversível)

## 🌟 Destaques Técnicos

### **Arquitetura de Componentes**
- **Componentes funcionais** com React Hooks
- **Context API** para estado global sem Redux
- **Componentes reutilizáveis** (Modals, Buttons)
- **Separação clara** entre lógica e apresentação

### **Gerenciamento de Estado**
```javascript
// AuthContext - Gerencia autenticação global
const { isAuthenticated, user } = useAuth();

// FavoritesContext - Gerencia favoritos do usuário
const { toggleFavorito, isFavorito } = useFavorites();
```

### **Roteamento Protegido**
```javascript
// Proteção de rotas sensíveis
<AuthCheck requireAuth={true}>
  <ProtectedComponent />
</AuthCheck>
```

## 🎨 Funcionalidades em Destaque

### **Sistema de Favoritos Inteligente**
- Persistência no localStorage
- Indicador visual em tempo real
- Integração com perfil do usuário

### **Modais Interativos**
- **AuthModal** - Redireciona para login quando necessário
- **ContactModal** - Facilita comunicação entre usuários
- **InfoModal** - Exibe termos e políticas

### **Chat Categorizado**
- Suporte por categoria (dúvidas, trocas, etc.)
- Integração com WhatsApp
- URLs dinâmicas por categoria

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📋 Próximas Implementações

- [ ] Sistema de avaliações entre usuários
- [ ] Filtros avançados de busca
- [ ] Sistema de notificações
- [ ] API backend para persistência
- [ ] Aplicativo mobile (React Native)
- [ ] Sistema de pagamento para premium

## 🐛 Reportar Problemas

Encontrou um bug? [Abra uma issue](https://github.com/rafaelvelosoAZ/ReVeste/issues) com:
- Descrição detalhada do problema
- Passos para reproduzir
- Screenshots (se aplicável)
- Informações do navegador e sistema

## 👨‍💻 Desenvolvedor

**Rafael Veloso**
- GitHub: [@rafaelvelosoAZ](https://github.com/rafaelvelosoAZ)
- LinkedIn: [Rafael Veloso](https://linkedin.com/in/rafael-veloso)
- Email: RevesteBrasil@gmail.com.br

## 🙏 Agradecimentos

- Comunidade React pela documentação excelente
- Inspiração em plataformas de economia circular
- Usuários beta que ajudaram nos testes

## 📊 Estatísticas do Projeto

- **+15 Componentes** React implementados
- **5+ Páginas** navegáveis
- **3 Contexts** para gerenciamento de estado
- **Interface 100% Responsiva**
- **Modais Interativos** para melhor UX

---

⭐ **Se este projeto foi útil para você, deixe uma estrela no repositório!**

🌱 **Juntos por um consumo mais consciente e sustentável**
