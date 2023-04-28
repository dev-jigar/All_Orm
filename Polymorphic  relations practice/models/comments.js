'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
  
    static associate(models) {
    comments.belongsTo(models.posts,{foreignKey:'post_id'})
    
    }
  }
  comments.init({
    post_id: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comments',
  });
  return comments;
};