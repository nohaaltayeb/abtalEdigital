'use strict';
const {
  Model
} = require('sequelize');

const {item , category}= require('../models');
module.exports = (sequelize, DataTypes) => {
  class category_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({item, category}) {
      // define association here
      category_items.belongsTo(item, {foreignKey:"itemId"});
      category_items.belongsTo(category, {foreignKey:"categoryId"});
      
    }
  };
  category_items.init({
    categoryId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'category_items',
  });
  return category_items;
};