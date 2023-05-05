"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        userName: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        country: {
          type: Sequelize.STRING,
        },
        bio: {
          type: Sequelize.STRING,
        },
        dateOfBirth: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.ENUM("Active", "Inactive"),
          defaultValue:'Inactive',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        isDeleted: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      },
      {
        timstamps: true,
        paranoid: true,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
