const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [3, 'Username deve ter no mínimo 3 caracteres'],
    maxlength: [30, 'Username deve ter no máximo 30 caracteres'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username deve conter apenas letras, números e underscores']
  },
  password: {
    type: String,
    required: [true, 'Password é obrigatório'],
    minlength: [6, 'Password deve ter no mínimo 6 caracteres'],
    select: false // Não retorna o password em queries por padrão
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.__v;
    delete ret._id;
    return ret;
  }
});

// Registra o modelo corretamente
const User = mongoose.model('User', userSchema);

// Garante que o índice único para username seja criado
User.createIndexes().catch(err => 
  console.error('Erro ao criar índices do User:', err.message)
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);