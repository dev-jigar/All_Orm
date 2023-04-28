"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class vedio extends Model {
    static associate(models) {
      vedio.hasMany(models.comment, {
        foreignKey: "commentTableId",
        constraints: false,
        scope: {
          commentTableType: "vedio",
        },
      });
    }
  }
  vedio.init(
    {
      title: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "vedio",
    }
  );
  return vedio;
};
