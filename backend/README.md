# 🌱 ReVeste - Backend API

Backend da plataforma ReVeste, desenvolvido com Node.js, Express e MongoDB.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados

## 📋 Pré-requisitos

- Node.js >= 14.0.0
- npm >= 6.0.0
- MongoDB (local ou Atlas)

## 🔧 Instalação

1. **Entre na pasta do backend:**
```bash
cd backend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
cp .env.example .env
```

4. **Edite o arquivo `.env` e adicione suas configurações:**
```env
PORT=5000
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=seu_secret_super_secreto
```

### 📦 Configurar MongoDB Atlas (Recomendado - Gratuito)

1. Acesse: https://www.mongodb.com/cloud/atlas
2. Crie uma conta gratuita
3. Crie um novo cluster (tier gratuito)
4. Crie um usuário de banco de dados
5. Adicione seu IP à whitelist (ou use 0.0.0.0/0 para permitir todos)
6. Copie a string de conexão
7. Cole no arquivo `.env` na variável `MONGODB_URI`

## ▶️ Executar

**Modo desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

A API estará rodando em: `http://localhost:5000`

## 📚 Endpoints da API

### Autenticação

#### POST /api/auth/register
Registrar novo usuário
```json
{
  "nome": "Rafael Silva",
  "email": "rafael@email.com",
  "password": "123456",
  "telefone": "(11) 99999-9999"
}
```

#### POST /api/auth/login
Fazer login
```json
{
  "email": "rafael@email.com",
  "password": "123456"
}
```

#### GET /api/auth/me
Obter dados do usuário atual (requer token)

### Usuários

#### GET /api/users/:id
Obter perfil de usuário

#### PUT /api/users/:id
Atualizar perfil (requer autenticação)

### Produtos

#### GET /api/produtos
Listar todos os produtos
- Query params: `?categoria=vestidos&genero=feminino&search=jeans`

#### GET /api/produtos/:id
Obter produto específico

#### POST /api/produtos
Criar novo produto (requer autenticação)

#### PUT /api/produtos/:id
Atualizar produto (requer autenticação)

#### DELETE /api/produtos/:id
Deletar produto (requer autenticação)

#### GET /api/produtos/user/:userId
Obter produtos de um usuário específico

## 🔐 Autenticação

A API usa JWT (JSON Web Tokens) para autenticação.

Para acessar rotas protegidas, inclua o token no header:
```
Authorization: Bearer seu_token_aqui
```

## 📊 Estrutura do Banco de Dados

### Collection: users
```javascript
{
  _id: ObjectId,
  nome: String,
  email: String (unique),
  password: String (hashed),
  telefone: String,
  foto: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: produtos
```javascript
{
  _id: ObjectId,
  titulo: String,
  descricao: String,
  categoria: String (enum),
  genero: String (enum),
  tamanho: String,
  condicao: String (enum),
  localizacao: String,
  fotos: [String],
  usuario: ObjectId (ref: User),
  autorEmail: String,
  ativo: Boolean,
  dataPublicacao: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testar a API

### Com curl:
```bash
# Registrar usuário
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@email.com","password":"123456"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","password":"123456"}'
```

### Com Postman/Insomnia:
Importe as rotas e teste cada endpoint.

## 🐛 Troubleshooting

**Erro de conexão com MongoDB:**
- Verifique se a string de conexão está correta no `.env`
- Verifique se seu IP está na whitelist do MongoDB Atlas
- Teste a conexão: `mongosh "sua_string_de_conexao"`

**Erro "JWT_SECRET not defined":**
- Certifique-se de ter criado o arquivo `.env`
- Adicione a variável `JWT_SECRET=qualquer_string_aleatoria`

**Porta já em uso:**
- Mude a porta no `.env`: `PORT=5001`

## 📝 Notas

- As senhas são automaticamente criptografadas com bcrypt
- A deleção de produtos é "soft delete" (apenas marca como inativo)
- Todos os endpoints de modificação requerem autenticação
- Validação de dados em todas as rotas

## 🔜 Próximas Melhorias

- [ ] Upload de imagens com Multer
- [ ] Sistema de favoritos no backend
- [ ] Chat em tempo real com Socket.io
- [ ] Sistema de avaliações
- [ ] Filtros avançados de busca
- [ ] Paginação de resultados

## 📞 Suporte

Em caso de dúvidas, consulte a documentação ou entre em contato.

---

**Desenvolvido para o projeto ReVeste - 2025**
