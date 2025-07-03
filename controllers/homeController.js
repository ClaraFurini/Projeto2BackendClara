const Company = require('../models/Company');
const Page = require('../models/Page');

// Página inicial
exports.homePage = async (req, res) => {
  try {
    // Busca informações da empresa e páginas do banco de dados
    const [company, mainPage] = await Promise.all([
      Company.findOne(),
      Page.findOne({ slug: 'home' })
    ]);

    res.render('home', {
      title: 'Home',
      user: req.session.user || null,
      company: company || {
        name: 'Empresa Fictícia',
        description: 'Soluções inovadoras para seu negócio',
        theme: {
          primaryColor: '#6a0dad',
          secondaryColor: '#000000'
        }
      },
      page: mainPage || {
        title: 'Bem-vindo à Empresa Fictícia',
        content: 'Somos especializados em soluções criativas para seu negócio.'
      }
    });
  } catch (err) {
    console.error('Erro ao carregar a página inicial:', err);
    res.status(500).render('error', {
      title: 'Erro',
      user: req.session.user || null,
      message: 'Ocorreu um erro ao carregar a página'
    });
  }
};

// Página "Sobre"
exports.aboutPage = async (req, res) => {
  try {
    const aboutPage = await Page.findOne({ slug: 'sobre' });
    
    res.render('page', {
      title: 'Sobre Nós',
      user: req.session.user || null,
      page: aboutPage || {
        title: 'Sobre Nós',
        content: 'Conheça mais sobre nossa empresa fictícia.'
      }
    });
  } catch (err) {
    console.error('Erro ao carregar página sobre:', err);
    res.status(500).render('error', {
      title: 'Erro',
      user: req.session.user || null,
      message: 'Ocorreu um erro ao carregar a página'
    });
  }
};

// Página de contato
exports.contactPage = async (req, res) => {
  try {
    const contactPage = await Page.findOne({ slug: 'contato' });
    
    res.render('contact', {
      title: 'Contato',
      user: req.session.user || null,
      page: contactPage || {
        title: 'Entre em Contato',
        content: 'Preencha o formulário abaixo para entrar em contato conosco.'
      }
    });
  } catch (err) {
    console.error('Erro ao carregar página de contato:', err);
    res.status(500).render('error', {
      title: 'Erro',
      user: req.session.user || null,
      message: 'Ocorreu um erro ao carregar a página'
    });
  }
};