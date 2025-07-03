const mongoose = require('mongoose');

require('./User');
require('./Company');
require('./Page');

module.exports = {
  User: mongoose.model('User'),
  Company: mongoose.model('Company'),
  Page: mongoose.model('Page')
};