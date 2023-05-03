'use strict';
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const UserData = [...Array(20)].map(() => ({
      name: faker.name.fullName(),
      email: faker.internet.email(),

      age:faker.random.numeric(2),

      start_Date:faker.date.between('2000-01-01T00:00:00.000Z', '2020-01-01T00:00:00.000Z'),
      createdAt:  new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("users", UserData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  }
};
