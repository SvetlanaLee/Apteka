const basketRoute = require('express').Router();
const { Basket, Drug, Order } = require('../db/models');

function findTotal(arr) {
  const price = arr.filter((basket) => basket['Drug.havePromo'] === false);
  let total = 0;
  // eslint-disable-next-line no-return-assign
  return total = price.map((el) => el['Drug.price']).reduce((sum, el) => sum + el, 0);
}

function findDiscount(array) {
  const discount = array.filter((basket) => basket['Drug.havePromo'] === true);
  let totalDiscount = 0;
  // eslint-disable-next-line no-return-assign
  return totalDiscount = discount.map((el) => el['Drug.price']).reduce((sum, el) => sum + el, 0);
}

basketRoute.post('/addToBasket', async (req, res) => {
  await Basket.create({
    drugId: req.body.id,
    userId: req.session.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.end();
});

basketRoute.get('/basket', async (req, res) => {
  const allBaskets = await Basket.findAll({
    raw: true,
    where: [
      { userId: req.session.user.id },
      { orderId: null },
    ],
    include: {
      model: Drug,
    },
  });

  const total = findTotal(allBaskets);
  const totalDiscount = findDiscount(allBaskets);

  res.render('basket', { allBaskets, total, totalDiscount });
});

basketRoute.post('/addToOrder', (req, res) => {
  const { total } = req.body;
  res.render('order', {
    total,
    layout: false,
  });
});

basketRoute.get('/order', async (req, res) => {
  const allBaskets = await Basket.findAll({
    raw: true,
    where: [
      { userId: req.session.user.id },
      { orderId: null },
    ],
    include: {
      model: Drug,
    },
  });
  const total = findTotal(allBaskets);
  res.render('order', { total });
});

basketRoute.post('/order/status', async (req, res) => {
  const { adress, tel } = req.body;
  // console.log(adress, tel);
  const allBaskets = await Basket.findAll({
    raw: true,
    where: [
      { userId: req.session.user.id },
      { orderId: null },
    ],
    include: {
      model: Drug,
    },
  });
  const total = findTotal(allBaskets);
  // console.log(adress, tel, total);
  const order = await Order.create({
    adress,
    tel,
    total,
    userId: req.session.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await Basket.update(
    {
      orderId: order.id,
    },
    {
      where: [
        { orderId: null },
        { userId: req.session.user.id },
      ],
    },
  );
  res.render('success');
});

module.exports = basketRoute;
