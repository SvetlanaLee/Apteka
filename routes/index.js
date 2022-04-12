const indexRoute = require('express').Router();
const checkAuth = require('../middleware/checkAuth');

indexRoute.get('/', checkAuth, (req, res) => res.render('index', {
  isAuthorized: req.session?.isAuthorized,
  name: req.session?.user?.name,
}));

module.exports = indexRoute;
