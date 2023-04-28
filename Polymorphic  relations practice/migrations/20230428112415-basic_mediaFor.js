"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("basic_medias", "media_for", {
      type:DataTypes.STRING
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("basic_medias", "media_for", {
      type:DataTypes.STRING
    });
  },
};
