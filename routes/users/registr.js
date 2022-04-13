const registrRoute = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
// const jwt = require('jsonwebtoken');
const { User } = require('../../db/models');
const isAuthorized = require('../../middleware/isAuthorized');
const isLoggedIn = require('../../middleware/isLoggedIn');
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
    res.render('index', {
      isAuthorized: req.session?.isAuthorized,
      name: req.session?.user?.name,
    });
  } catch (error) {
    res.render('error', { error: error.message });
  }
});

registrRoute.get('/auth', isAuthorized, (req, res) => res.render('users/auth', {
  isAuthorized: req.session?.isAuthorized,
  name: req.session?.user?.name,
}));

registrRoute.post('/auth', async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({
    where: { login },
  });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    req.session.isAuthorized = true;
    return res.render('index', {
      isAuthorized: req.session?.isAuthorized,
      name: req.session?.user?.name,
    });
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
);

registrRoute.get('/failure', (req, res) => res.send('Something wrong'));

registrRoute.get('/protected', (req, res) => res.send('Success auth'));
// ------------------------------

registrRoute.get('/profile', isAuthorized, (req, res) => res.render('users/profile', {
  isAuthorized: req.session?.isAuthorized,
  name: req.session?.user?.name,
}));

registrRoute.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('coockie');
  res.redirect('/');
});

module.exports = registrRoute;
