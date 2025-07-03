const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.loginPage = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Buscar usuário incluindo o campo password
    const user = await User.findOne({ username }).select('+password');
    if (!user) return res.redirect('/auth/login');

    // Usar método do model para comparar senha
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.redirect('/auth/login');

    // Salvar versão limpa do usuário na sessão (sem password)
    req.session.user = user.toJSON();

    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error('Erro no login:', err);
    res.redirect('/auth/login');
  }
};

exports.registerPage = (req, res) => {
  res.render('register', { title: 'Cadastro' });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Verificar se usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // Poderia usar flash message para avisar, aqui só redireciona
      return res.redirect('/auth/register');
    }

    // Criar e salvar novo usuário
    const user = new User({ username, password });
    await user.save();

    // Logar automaticamente após cadastro
    req.session.user = user.toJSON();

    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error('Erro no cadastro:', err);
    res.redirect('/auth/register');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao destruir sessão:', err);
      return res.redirect('/admin/dashboard');
    }
    res.redirect('/');
  });
};
