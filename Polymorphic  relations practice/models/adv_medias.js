'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adv_medias extends Model {

    static associate(models) {
      adv_medias.belongsTo(models.users, {
        foreignKey: 'user_id'
      });
    }
  }
  adv_medias.init({
    media_url: DataTypes.STRING,
    media_type: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'adv_medias',
  });
  return adv_medias;
};