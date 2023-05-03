'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salaries extends Model {

    static associate(models) {
      salaries.belongsTo(models.users,{foreignKey:'u_id'})
    }
  }
  salaries.init({
    u_id: DataTypes.INTEGER,
    salary: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'salaries',
  });
  return salaries;
};