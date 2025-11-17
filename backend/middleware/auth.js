const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Obter token do header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // Buscar usuário
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Adicionar usuário à requisição
    req.user = {
      id: user._id.toString(),
      email: user.email,
      nome: user.nome
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido', error: error.message });
  }
};

module.exports = authMiddleware;
