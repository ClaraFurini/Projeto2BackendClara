const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'O nome da empresa é obrigatório'],
    trim: true,
    maxlength: [100, 'O nome não pode exceder 100 caracteres']
  },
  description: {
    type: String,
    maxlength: [500, 'A descrição não pode exceder 500 caracteres']
  },
  theme: {
    primaryColor: {
      type: String,
      default: '#6a0dad'
    },
    secondaryColor: {
      type: String,
      default: '#000000'
    },
    accentColor: {
      type: String,
      default: '#ba68c8'
    }
  },
  contact: {
    email: String,
    phone: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
});


module.exports = mongoose.models.Company || mongoose.model('Company', companySchema);