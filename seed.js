require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

async function seedDatabase() {
  try {
    console.log('⏳ Conectando ao banco de dados...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/empresa_ficticia', {
      serverSelectionTimeoutMS: 5000
    });

    // Importa os modelos DEPOIS da conexão
    const User = require('./models/User');
    const Company = require('./models/Company');
    const Page = require('./models/Page');

    console.log('🧹 Limpando coleções existentes...');
    await Promise.all([
      User.deleteMany({}),
      Company.deleteMany({}),
      Page.deleteMany({})
    ]);

    console.log('👨‍💼 Criando usuário admin...');
    await User.create({
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    });

    console.log('🏢 Criando dados da empresa...');
    await Company.create({
      name: 'Empresa Fictícia Ltda',
      description: 'Soluções inovadoras em tecnologia',
      theme: {
        primaryColor: '#6a0dad',
        secondaryColor: '#000000'
      }
    });

    console.log('📝 Criando páginas iniciais...');
    await Page.create([
      {
        title: 'Bem-vindo à nossa empresa',
        content: 'Somos líderes no mercado de soluções fictícias desde 2023.',
        slug: 'home'
      },
      {
        title: 'Sobre Nós',
        content: 'Fundada em 2023, nossa empresa busca inovar no mercado.',
        slug: 'sobre'
      }
    ]);

    console.log('\n🎉 Banco de dados populado com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Erro durante o seed:', err);
    process.exit(1);
  }
}

seedDatabase();