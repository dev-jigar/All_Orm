"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    static associate(models) {
      posts.belongsTo(models.users, {
        foreignKey: "user_id",
      });
      posts.hasMany(models.comments, {
        foreignKey: "post_id",
      });
    }
  }

  posts.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "posts",
      timestamps: true,
      freezeTableName: true,
    }
  );

  return posts;
};
