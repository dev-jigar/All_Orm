'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {

    static associate(models) {
     users.belongsToMany(models.projects,{through:'user_projects'});
    }
  }
  users.init({
    firstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};