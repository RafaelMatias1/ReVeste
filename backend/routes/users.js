const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// GET /api/users/:id - Obter perfil de usuário
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
  }
});

// PUT /api/users/:id - Atualizar perfil (requer autenticação)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { nome, telefone, foto } = req.body;

    // Verificar se usuário está atualizando seu próprio perfil
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { nome, telefone, foto },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ 
      message: 'Perfil atualizado com sucesso',
      user 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil', error: error.message });
  }
});

// DELETE /api/users/:id - Deletar usuário (requer autenticação)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    // Verificar se usuário está deletando sua própria conta
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Não autorizado' });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ 
      message: 'Conta deletada com sucesso'
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar conta', error: error.message });
  }
});

module.exports = router;
