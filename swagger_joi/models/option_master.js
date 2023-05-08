"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class option_master extends Model {
    static associate(models) {
      option_master.belongsTo(models.select_master, {
        foreignKey: "s_id",
        onDelete: "cascade",
        onUpdate:"cascade",
      });
    }
  }
  option_master.init(
    {
      op_name: DataTypes.STRING,
      s_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "option_master",
    }
  );
  return option_master;
};
