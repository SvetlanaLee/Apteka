module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Orders', [
      {
        userId: 1,
        total: 200,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        total: 300,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        total: 300,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        total: 200,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Orders');
  },
};
