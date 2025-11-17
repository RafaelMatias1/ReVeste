const mongoose = require('mongoose');
const User = require('../models/User');
const Produto = require('../models/Produto');

async function limparBanco() {
  try {
    await mongoose.connect('mongodb://localhost:27017/reveste');
    
    console.log('\n🧹 Limpando banco de dados...\n');
    
    // Deletar todos os usuários
    const usersDeleted = await User.deleteMany({});
    console.log(`✅ ${usersDeleted.deletedCount} usuários deletados`);
    
    // Deletar todos os produtos
    const produtosDeleted = await Produto.deleteMany({});
    console.log(`✅ ${produtosDeleted.deletedCount} produtos deletados`);
    
    console.log('\n✨ Banco de dados limpo com sucesso!\n');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao limpar banco de dados:', error);
    process.exit(1);
  }
}

limparBanco();
