const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/empresa_ficticia', {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10, 
    });

    console.log('✅ Conectado ao MongoDB');
    
    
    console.log('Modelos registrados:', mongoose.modelNames());
    
  } catch (err) {
    console.error('❌ Falha na conexão com MongoDB:', err.message);
    
    process.exit(1);
  }
};


mongoose.connection.on('connected', () => {
  console.log('Mongoose conectado ao DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão do Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado');
});


process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Conexão encerrada pelo término da aplicação');
  process.exit(0);
});

module.exports = connectDB;