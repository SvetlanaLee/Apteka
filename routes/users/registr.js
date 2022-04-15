const registrRoute = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../../db/models');
const { isAuthorized } = require('../../middleware/isAuthorized');
const checkAuth = require('../../middleware/checkAuth');

const mailer = require('../../nodemailer');
// const jwt = require('jsonwebtoken');
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
  } catch (error) {
    res.render('error', { error: error.message });
  }
  return res.redirect('/');
});

registrRoute.get('/auth', (req, res) => res.render('users/auth'));

registrRoute.post('/auth', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({
    where: { login },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log('pass', await bcrypt.compare(password, user.password));
    req.session.user = user;
    req.session.isAuthorized = true;
    console.log('req.session.user', req.session.user);
    return res.redirect('/');
  } if (login === 'admin' && password === '123') {
    req.session.user = user;
    req.session.isAuthorized = true;
    return res.redirect('/admin');
  }
  return res.send('Пожалуйста проверьте логин и пароль!');
});
// ------------------------------
// Аутентификация Google
registrRoute.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

registrRoute.get(

  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/failure',
  }),

  passport.authenticate('google', {
    // successRedirect: '/protected',
    failureRedirect: '/failure',
  }),
  // passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  (req, res) => {
    // req.session.user = user;
    req.session.isAuthorized = true;
    // console.log('req.session.user', req.session.user);
    return res.redirect('/');
  },
);

registrRoute.get('/failure', (req, res) => res.send('Something wrong'));

registrRoute.get('/protected', (req, res) => res.send('Success auth'));
// ------------------------------

registrRoute.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('cookie');
  return res.redirect('/');
});

module.exports = registrRoute;
