const registrRoute = require('express').Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User } = require('../../db/models');
const checkAuth = require('../../middleware/checkAuth');
// const auth = require('./passport');

registrRoute.get('/reg', (req, res) => {
  res.render('users/reg');
});

registrRoute.post('/reg', async (req, res) => {
  const {
    name, email, password, login,
  } = req.body;
  await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    login,
  });
  res.redirect('/');
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
    res.send('Something wrong, check your login or password!');
  }
});

registrRoute.get('/profile', checkAuth, (req, res) => {
  res.render('users/profile');
});

module.exports = registrRoute;
