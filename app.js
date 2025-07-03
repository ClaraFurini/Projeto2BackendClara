require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const connectDB = require('./config/database');

const app = express();  // 1 - declare o app primeiro

(async () => {
  try {
    await connectDB();

    // Configurações do Express
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    // Configuração da sessão
    app.use(session({
      secret: process.env.SESSION_SECRET || 'changeme',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 3600000 }
    }));

    // Middleware para disponibilizar o usuário autenticado nas views
    app.use((req, res, next) => {
      res.locals.user = req.session.user || null;
      next();
    });

    // Motor de views e diretório
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Rotas - registre suas rotas depois das configurações
    app.use('/', require('./routes/homeRoutes'));
    app.use('/auth', require('./routes/authRoutes'));
    app.use('/admin', require('./routes/adminRoutes'));

    // Middleware 404
    app.use((req, res) => {
      res.status(404).render('error', {
        title: 'Página não encontrada',
        message: 'A página que você tentou acessar não existe.'
      });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
})();
