const registrRoute = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

registrRoute.get('/', (req, res) => {
  res.render('reg');
});

registrRoute.post('/', async (req, res) => {
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

module.exports = registrRoute;
