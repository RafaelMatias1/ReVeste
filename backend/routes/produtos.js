const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Produto = require('../models/Produto');
const authMiddleware = require('../middleware/auth');

// Validação de produto
const produtoValidation = [
  body('titulo').trim().notEmpty().withMessage('Título é obrigatório'),
  body('descricao').trim().notEmpty().withMessage('Descrição é obrigatória'),
  body('categoria').isIn(['vestidos', 'blusas', 'calcas', 'shorts', 'calcados', 'acessorios', 'outros']).withMessage('Categoria inválida'),
  body('genero').isIn(['feminino', 'masculino', 'infantil', 'unissex']).withMessage('Gênero inválido'),
  body('tamanho').trim().notEmpty().withMessage('Tamanho é obrigatório'),
  body('condicao').isIn(['novo', 'usado-perfeito', 'usado-bom', 'usado-regular']).withMessage('Condição inválida'),
  body('localizacao').trim().notEmpty().withMessage('Localização é obrigatória')
];

// GET /api/produtos - Listar todos os produtos ativos
router.get('/', async (req, res) => {
  try {
    const { categoria, genero, search } = req.query;
    
    let query = { ativo: true };
    
    if (categoria) query.categoria = categoria;
    if (genero) query.genero = genero;
    if (search) {
      query.$or = [
        { titulo: { $regex: search, $options: 'i' } },
        { descricao: { $regex: search, $options: 'i' } }
      ];
    }

    const produtos = await Produto.find(query)
      .populate('usuario', 'nome email telefone')
      .sort({ dataPublicacao: -1 });

    res.json({ produtos, total: produtos.length });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos', error: error.message });
  }
});

// GET /api/produtos/:id - Obter produto específico
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id)
      .populate('usuario', 'nome email telefone foto');

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.json({ produto });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produto', error: error.message });
  }
});

// POST /api/produtos - Criar novo produto (requer autenticação)
router.post('/', authMiddleware, produtoValidation, async (req, res) => {
  try {
    // Validar dados
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { titulo, descricao, categoria, genero, tamanho, condicao, localizacao, fotos } = req.body;

    const produto = new Produto({
      titulo,
      descricao,
      categoria,
      genero,
      tamanho,
      condicao,
      localizacao,
      fotos: fotos || [],
      usuario: req.user.id,
      autorEmail: req.user.email
    });

    await produto.save();
    await produto.populate('usuario', 'nome email telefone');

    res.status(201).json({
      message: 'Produto criado com sucesso',
      produto
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar produto', error: error.message });
  }
});

// PUT /api/produtos/:id - Atualizar produto (requer autenticação)
router.put('/:id', authMiddleware, produtoValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const produto = await Produto.findById(req.params.id);

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Verificar se usuário é o dono do produto
    if (produto.usuario.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    const { titulo, descricao, categoria, genero, tamanho, condicao, localizacao, fotos } = req.body;

    produto.titulo = titulo;
    produto.descricao = descricao;
    produto.categoria = categoria;
    produto.genero = genero;
    produto.tamanho = tamanho;
    produto.condicao = condicao;
    produto.localizacao = localizacao;
    if (fotos) produto.fotos = fotos;

    await produto.save();
    await produto.populate('usuario', 'nome email telefone');

    res.json({
      message: 'Produto atualizado com sucesso',
      produto
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
});

// DELETE /api/produtos/:id - Deletar produto (requer autenticação)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Verificar se usuário é o dono do produto
    if (produto.usuario.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    // Soft delete (marcar como inativo)
    produto.ativo = false;
    await produto.save();

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar produto', error: error.message });
  }
});

// GET /api/produtos/user/:userId - Obter produtos de um usuário
router.get('/user/:userId', async (req, res) => {
  try {
    const produtos = await Produto.find({ 
      usuario: req.params.userId,
      ativo: true 
    })
    .populate('usuario', 'nome email telefone')
    .sort({ dataPublicacao: -1 });

    res.json({ produtos, total: produtos.length });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar produtos do usuário', error: error.message });
  }
});

module.exports = router;
