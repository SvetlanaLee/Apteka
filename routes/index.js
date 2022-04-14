const indexRoute = require('express').Router();
const { Drug } = require('../db/models');

indexRoute.get('/', async (req, res) => {
  const drugs = await Drug.findAll({ raw: true });
  // console.log(drugs);
  res.render('index', { drugs });
});

module.exports = indexRoute;
