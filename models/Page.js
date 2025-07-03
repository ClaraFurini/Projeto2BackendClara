const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'O título é obrigatório'],
    trim: true,
    maxlength: [100, 'O título não pode exceder 100 caracteres']
  },
  content: {
    type: String,
    required: [true, 'O conteúdo é obrigatório']
  },
  slug: {
    type: String,
    required: [true, 'O slug é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'O slug deve conter apenas letras minúsculas, números e hifens']
  },
  seo: {
    title: String,
    description: String
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

// Middleware para atualizar o updatedAt
pageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Registra o modelo corretamente
module.exports = mongoose.models.Page || mongoose.model('Page', pageSchema);