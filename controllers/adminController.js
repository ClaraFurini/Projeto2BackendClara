exports.dashboard = (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  res.render('dashboard', { 
    title: 'Dashboard', 
    user: req.session.user 
  });
};