const indexRoute = require('express').Router();
// const checkAuth = require('../middleware/checkAuth');
const { Op } = require("sequelize");
const { Drug, Promo } = require('../db/models');

async function promoUpdate() {
  const allPromo = await Promo.findAll({ raw: true });

  // получаем сегодняшнюю дату
  const day = Number(new Date().getDate());
  const rightDay = (day < 10) ? `0${day}` : day;
  const month = Number((new Date().getMonth()) + 1);
  const rightMonth = (month < 10) ? `0${month}` : month;
  const year = Number(new Date().getFullYear());
  const now = `${year}-${rightMonth}-${rightDay}`;

  // ищем актуальную акцию
  const currentPromo = allPromo.filter((promo) => promo.date <= now && promo.end >= now);
  // console.log(currentPromo[0].id);

  // обновляем БД по акционным товарам
  await Drug.update(
    {
      havePromo: true,
      discountPrice: 0,
    },
    { where: { promoId: currentPromo[0].id } },
  );

  // возвращаем false у тех товаров, у которых промо прошло
  await Drug.update(
    {
      havePromo: false,
    },
    {
      where: [
        { havePromo: true },
        { [Op.not]: { promoId: currentPromo[0].id } },
      ],
    },
  );
}

indexRoute.get('/', async (req, res) => {
  const drugs = await Drug.findAll({
    raw: true,
    order: [['price', 'DESC']],
    include: {
      model: Promo,
    },
  });

  promoUpdate();

  res.render('index', { drugs });
});

module.exports = indexRoute;
