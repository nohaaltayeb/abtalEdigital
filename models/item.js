'use strict';
const {
  Model
} = require('sequelize');

const {User,category} = require('../models');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, category}) {
      // define association here
      item.belongsTo(category, {foreignKey:"categoryId"});
      item.belongsTo(User, {foreignKey:"userId"})
    }
  };
  item.init({
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};