"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      user.belongsToMany(models.course, {
        through: models.user_course,
        foreignKey: "userId",
      });
      user.hasMany(models.user_course, { foreignKey: "userId" });
      user.hasMany(models.comment,{
      foreignKey: 'user_id'
      })
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
      paranoid: true,
      timestamps: true,
      scopes:{
        
      }
    }
  );
  return user;
};
