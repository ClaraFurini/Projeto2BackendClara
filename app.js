require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const connectDB = require('./config/database');

const app = express();  
(async () => {
  try {
    await connectDB();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(session({
      secret: process.env.SESSION_SECRET || 'changeme',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 3600000 }
    }));

    app.use((req, res, next) => {
      res.locals.user = req.session.user || null;
      next();
    });

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    app.use('/', require('./routes/homeRoutes'));
    app.use('/auth', require('./routes/authRoutes'));
    app.use('/admin', require('./routes/adminRoutes'));

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
