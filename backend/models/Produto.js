const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true
  },
  descricao: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    trim: true
  },
  categoria: {
    type: String,
    required: [true, 'Categoria é obrigatória'],
    enum: ['vestidos', 'blusas', 'calcas', 'camisetas', 'casacos', 'shorts', 'calcados', 'acessorios', 'outros']
  },
  genero: {
    type: String,
    required: [true, 'Gênero é obrigatório'],
    enum: ['feminino', 'masculino', 'infantil', 'unissex']
  },
  tamanho: {
    type: String,
    required: [true, 'Tamanho é obrigatório']
  },
  condicao: {
    type: String,
    required: [true, 'Condição é obrigatória'],
    enum: ['novo', 'novo-etiqueta', 'novo-sem-etiqueta', 'usado-perfeito', 'usado-bom', 'usado-regular']
  },
  localizacao: {
    type: String,
    required: [true, 'Localização é obrigatória']
  },
  fotos: [{
    type: String
  }],
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  autorEmail: {
    type: String,
    required: true
  },
  ativo: {
    type: Boolean,
    default: true
  },
  dataPublicacao: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índices para melhorar performance de busca
produtoSchema.index({ categoria: 1, genero: 1 });
produtoSchema.index({ usuario: 1 });
produtoSchema.index({ ativo: 1 });

module.exports = mongoose.model('Produto', produtoSchema);
