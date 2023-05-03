"use strict";

const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const UserData = [...Array(40)].map(() => ({
      salary: faker.random.numeric(5),

      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert("salaries", UserData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("salaries", null, {});
  },
};
