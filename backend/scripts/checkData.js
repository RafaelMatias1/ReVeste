const mongoose = require('mongoose');
const User = require('../models/User');
const Produto = require('../models/Produto');

async function checkData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/reveste');
    
    console.log('\n=== USUÁRIOS ===');
    const users = await User.find().select('nome email _id');
    console.log(`Total de usuários: ${users.length}`);
    users.forEach(u => {
      console.log(`- ${u.nome} (${u.email}) - ID: ${u._id}`);
    });
    
    console.log('\n=== PRODUTOS ===');
    const produtos = await Produto.find().populate('usuario', 'nome email');
    console.log(`Total de produtos: ${produtos.length}`);
    produtos.forEach(p => {
      console.log(`- ${p.titulo} (${p.categoria})`);
      console.log(`  Usuario: ${p.usuario?.nome || 'N/A'} - ID: ${p.usuario?._id || 'N/A'}`);
      console.log(`  Ativo: ${p.ativo}`);
    });
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
}

checkData();
