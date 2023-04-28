"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    static associate(models) {
      image.hasMany(models.comment, {
        foreignKey: "commentTableId",
        constraints: false,
        scope: {
          commentTableType: "image",
        },
      });
    }
  }
  image.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "image",
    }
  );
  return image;
};
