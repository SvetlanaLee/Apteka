"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Drug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Basket, Promo }) {
      this.hasMany(Basket, {
        foreignKey: "drugId",
      });
      this.belongsTo(Promo, {
        foreignKey: "promoId",
      });
    }
  }
  Drug.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      image: DataTypes.TEXT,
      info: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      promoId: DataTypes.INTEGER,
    },

    {
      sequelize,
      modelName: "Drug",
    }
  );
  return Drug;
};
