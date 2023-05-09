'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {

    static associate(models) {
  
    }
  }
  users.init({
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    UserName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    contact: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};