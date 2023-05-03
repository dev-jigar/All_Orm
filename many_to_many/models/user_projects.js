'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_projects extends Model {

    static associate(models) {
      // define association here
    }
  }
  user_projects.init({
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user_projects',
  });
  return user_projects;
};