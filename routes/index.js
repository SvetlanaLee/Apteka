const indexRoute = require('express').Router();
// const checkAuth = require('../middleware/checkAuth');
const  { isAuthorized } = require('../middleware/isAuthorized');

indexRoute.get('/', isAuthorized, (req, res) => res.render('index', {
  isAuthorized: req.session?.isAuthorized,
  name: req.session?.user?.name,
}));

module.exports = indexRoute;
