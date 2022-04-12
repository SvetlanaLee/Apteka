const registrRoute = require('express').Router();
const bcrypt = require('bcrypt');

registrRoute.get('/', (req, res) => {
  res.render('reg');
});

module.exports = registrRoute;
