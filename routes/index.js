const indexRoute = require('express').Router();
// const checkAuth = require('../middleware/checkAuth');
const { Drug } = require('../db/models');

indexRoute.get('/', async (req, res) => {
  const drugs = await Drug.findAll({
    raw: true,
    order: [['price', 'DESC']],
  });
  res.render('index', { drugs });
});

module.exports = indexRoute;
