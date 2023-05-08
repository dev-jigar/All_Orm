'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class select_master extends Model {

    static associate(models) {
      select_master.hasMany(models.option_master,{foreignKey: 's_id',onDelete:'cascade',onUpdate:"cascade"})
    }
  }
  select_master.init({
    name: DataTypes.STRING,
    controller: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'select_master',
  });
  return select_master;
};