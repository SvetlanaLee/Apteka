const indexRoute = require('express').Router();
// const checkAuth = require('../middleware/checkAuth');
const isAuthorized = require('../middleware/isAuthorized');
const { Drug } = require('../db/models');

// indexRoute.get('/', isAuthorized, (req, res) => res.render('index', {
//   isAuthorized: req.session?.isAuthorized,
//   name: req.session?.user?.name,
// }));

indexRoute.get('/', isAuthorized, async (req, res) => {
  const drugs = await Drug.findAll({ raw: true });
  console.log(drugs);
  res.render('index', { drugs });
});

module.exports = indexRoute;
