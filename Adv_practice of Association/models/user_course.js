"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_course extends Model {
    static associate(models) {
      user_course.belongsTo(models.user, { foreignKey: "userId" });
      user_course.belongsTo(models.course, { foreignKey: "courseId" });
    }
  }
  user_course.init(
    {
      userId: DataTypes.INTEGER,
      courseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user_course",
    }
  );

  user_course.removeAttribute("id");
  return user_course;
};
