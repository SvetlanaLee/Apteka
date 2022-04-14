const basketRoute = require('express').Router();
const { Basket, Drug } = require('../db/models');

basketRoute.post('/addToBasket', async (req, res) => {
  const kor = await Basket.create({
    drugId: req.body.id,
    userId: req.session.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(kor);
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
  res.render('basket', { allBaskets });
});

module.exports = basketRoute;
