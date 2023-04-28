'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
   
    static associate(models) {
      // define association here
      users.hasMany(models.posts, {
        foreignKey: 'userId',
        as: 'posts'
      });
      users.hasMany(models.basic_medias,{foreignKey: 'user_id'});
      users.hasMany(models.adv_medias,{foreignKey: 'user_id'});
    }
  }
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    start:DataTypes.DATE,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
    timestamps: true,
    paranoid: true,
  });
  return users;
};