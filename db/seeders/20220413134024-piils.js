'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Drugs', [
      {
        name: 'Эльбрустин',
        price: 100,
        categoryId: 1,
        image: '/img/tabletki.jpeg',
        info: 'Прими таблетку и стань программистом. Необходимо пропить полный курс(3 месяца)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Полчаcика',
        price: 30,
        categoryId: 1,
        image: '/img/tabletki.jpeg',
        info: 'Когда нужно быстро запилить проект.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Вспомнить всё',
        price: 100,
        categoryId: 1,
        image: '/img/tabletki.jpeg',
        info: 'Витамины для улучшения памяти',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Озверин',
        price: 100,
        categoryId: 1,
        image: '/img/tabletki.jpeg',
        info: 'Ваш билет в дурку',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Гель енот-полоскун',
        price: 100,
        categoryId: 1,
        image: '/img/tabletki.jpeg',
        info: 'Ваша кожа станет шелковистой и полосатой',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Обнимашки',
        price: 100,
        categoryId: 1,
        image: '/img/tabletki.jpeg',
        info: 'Когда Вам не хватает любви и ласки',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Drugs');
  },
};
