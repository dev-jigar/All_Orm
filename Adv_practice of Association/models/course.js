'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {

    static associate(models) {
 
      course.belongsToMany(models.user, {
        through: models.user_course,
        foreignKey: "userId",
      });
    }
  }
  course.init({
    courseName: DataTypes.STRING,
    courseDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course',
    timestamps: true,
    paranoid: true,
  });
  return course;
};