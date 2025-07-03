const mongoose = require('mongoose');

// Importe todos os modelos
require('./User');
require('./Company');
require('./Page');

// Exporte os modelos registrados
module.exports = {
  User: mongoose.model('User'),
  Company: mongoose.model('Company'),
  Page: mongoose.model('Page')
};