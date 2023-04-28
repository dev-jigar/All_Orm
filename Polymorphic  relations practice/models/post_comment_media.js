'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_comment_media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post_comment_media.init({
    action_type: DataTypes.STRING,
    action_id: DataTypes.INTEGER,
    attach_id: DataTypes.INTEGER,
    attach_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post_comment_media',
  });
  return post_comment_media;
};