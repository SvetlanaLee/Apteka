const indexRoute = require('express').Router();
// const checkAuth = require('../middleware/checkAuth');
// const isAuthorized = require('../middleware/isAuthorized');

indexRoute.get('/', (req, res) => res.render('index'));

module.exports = indexRoute;
