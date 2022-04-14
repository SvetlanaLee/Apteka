const profileRoute = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Order } = require('../../db/models');

profileRoute.get('/', async (req, res) => {
  // console.log(req.session.user);
  const { id } = req.session.user;
  // console.log(id);
  const user = await User.findByPk(id);
  const orders = await Order.findAll({ where: { userId: id } });
  req.session.user = user;
  // console.log('запрос в базу', user);
  // console.log('запрос в сессию', req.session.user);
  res.render('users/profile', { user, orders });
});

profileRoute.get('/edit', async (req, res) => {
  res.render('users/profileEdit');
});

profileRoute.post('/edit', async (req, res) => {
  try {
    let user = await User.update({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    }, { where: { id: req.session.user.id }, returning: true, plain: true });
    user = await User.findByPk(req.session.user.id);
    req.session.user = user;
    return res.render('users/profile', { user });
  } catch (error) {
    return res.send('Не удалось обновить запись в базе данных.');
  }
});

module.exports = profileRoute;
