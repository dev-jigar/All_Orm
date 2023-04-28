'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('comments','user_id',{type:DataTypes.INTEGER})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('comments','user_id',{type:DataTypes.INTEGER})
  }
};
