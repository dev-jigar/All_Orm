'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class basic_medias extends Model {

    static associate(models) {
      basic_medias.belongsTo(models.users, {
        foreignKey: 'user_id'
      });
    }
  }
  basic_medias.init({
    media_url: DataTypes.STRING,
    media_type: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'basic_medias',
  });
  return basic_medias;
};