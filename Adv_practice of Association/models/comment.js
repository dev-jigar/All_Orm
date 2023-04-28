"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    static associate(models) {
      comment.belongsTo(models.image, {
        foreignKey: "commentTableId",
        constraints: false,
      });
      comment.belongsTo(models.vedio, {
        foreignKey: "commentTableId",
        constraints: false,
      });
      comment.belongsTo(models.user, {
        foreignKey: "user_id",
        
      });
  
     
    }
  }
  comment.init(
    {
      comment: DataTypes.STRING,
      commentTableId: {
        type: DataTypes.INTEGER,
      },

      commentTableType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};
