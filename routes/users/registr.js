const registrRoute = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../../db/models');
const checkAuth = require('../../middleware/checkAuth');
const mailer = require('../../nodemailer');
// const checkEmpty = require('../../middleware/checkEmpty');
// const auth = require('./passport');

registrRoute.get('/reg', (req, res) => {
  res.render('users/reg');
});

registrRoute.post('/reg', async (req, res) => {
  try {
    const {
      name, email, password, login,
    } = req.body;
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      login,
    });
    req.session.user = user;
    req.session.isAuthorized = true;
    const message = {
      from: 'Apteka <jovani.hilpert36@ethereal.email>',
      to: req.body.email,
      subject: 'Добро пожаловать!',
      text: `Подздравляем с успешной регистрацией.
      Ваши данные: 
      логин ${req.body.login}
      password ${req.body.password}
      Данное письмо не требует ответа.
      
      С заботой, Ваша Аптека.`,
    };
    mailer(message);
    res.redirect('/');
  } catch (error) {
    res.render('error', { error: error.message });
  }
});

registrRoute.get('/auth', (req, res) => {
  res.render('users/auth');
});

registrRoute.post('/auth', async (req, res) => {
  const { login, password } = req.body;
  console.log('login', login);
  const user = await User.findOne({
    where: { login },
  });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    req.session.isAuthorized = true;
    res.redirect('/');
  } else {
    res.send('Пожалуйста проверьте логин и пароль!');
  }
});

registrRoute.get('/profile', checkAuth, (req, res) => {
  res.render('users/profile');
});

registrRoute.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('coockie');
  res.redirect('/');
});

module.exports = registrRoute;
