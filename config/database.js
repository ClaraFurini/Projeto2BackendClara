const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Configurações otimizadas para versões recentes do Mongoose
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/empresa_ficticia', {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10, // Número máximo de conexões
    });

    console.log('✅ Conectado ao MongoDB');
    
    // Verifica os modelos registrados
    console.log('Modelos registrados:', mongoose.modelNames());
    
  } catch (err) {
    console.error('❌ Falha na conexão com MongoDB:', err.message);
    // Encerra o processo com falha
    process.exit(1);
  }
};

// Eventos de conexão
mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado ao DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão do Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado');
});

// Fechar conexão adequadamente
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Conexão encerrada pelo término da aplicação');
  process.exit(0);
});

module.exports = connectDB;