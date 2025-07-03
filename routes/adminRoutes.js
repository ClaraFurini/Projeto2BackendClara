const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware para proteger rotas administrativas
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/auth/login');
}

// Rota protegida do dashboard
router.get('/dashboard', ensureAuthenticated, adminController.dashboard);

module.exports = router;
