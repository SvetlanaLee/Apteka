# Apteka
'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Drugs', [
      {
        name: 'Эльбрустин',
        price: 100,
        categoryId: 1,
        info: 'Прими таблетку и стань программистом. Необходимо пропить полный курс(3 месяца)',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Полчачика',
        price: 30,
        categoryId: 1,
        info: 'Когда нужно быстро запилить проект.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Вспомнить всё',
        price: 100,
        categoryId: 1,
        info: 'Витамины для улучшения памяти',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Drugs');
  },
};
