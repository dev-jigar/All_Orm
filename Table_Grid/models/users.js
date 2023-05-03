'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {

    static associate(models) {
      users.hasOne(models.salaries,{foreignKey:'u_id'})
    }
  }
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER,
    start_Date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};