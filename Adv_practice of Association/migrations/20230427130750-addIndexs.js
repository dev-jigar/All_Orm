'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('users',['email','id'],{
      name:'email_id',
      unique: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('users',['email','id'],{
      name:'email_id',
      unique: true
    })
  }
};
