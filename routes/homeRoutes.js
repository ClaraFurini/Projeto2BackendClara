const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Rotas públicas
router.get('/', homeController.homePage);
router.get('/sobre', homeController.aboutPage);
router.get('/contato', homeController.contactPage);

module.exports = router;