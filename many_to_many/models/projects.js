'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {

    static associate(models) {
     projects.belongsToMany(models.users,{through:'user_projects'})
    }
  }
  projects.init({
    pName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};