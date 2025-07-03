const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.loginPage = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
   
    const user = await User.findOne({ username }).select('+password');
    if (!user) return res.redirect('/auth/login');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.redirect('/auth/login');

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
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.redirect('/auth/register');
    }

    const user = new User({ username, password });
    await user.save();

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
