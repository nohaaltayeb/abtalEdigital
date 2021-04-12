'use strict';
const {
  Model
} = require('sequelize');

const {User,item,category_items} = require("../models")
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */


    static associate({User, item, category_items}) {
      // define association here
      category.belongsTo(User, {foreignKey:"userId"});
      //category.hasMany(category_items);
      //category.belongsToMany(item, {through:"category_items"}, {foreignKey:"categoryId"});
      category.hasMany(item, {foreignKey:"categoryId"})
    }
  };
  category.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};