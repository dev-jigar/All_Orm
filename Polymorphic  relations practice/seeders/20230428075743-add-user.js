'use strict';
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {
    let date = new Date()
    const UserData = [...Array(20)].map(() => ({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      age:faker.random.numeric(2),
      status: faker.random.numeric(1),
      start:new Date(),
      createdAt:  new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("users", UserData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  }
};
