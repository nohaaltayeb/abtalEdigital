'use strict';
const {
  Model
} = require('sequelize');
const category = require("./category");
const item = require("./item")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({category, item}) {
      // define association here
      User.hasMany(category, {foreignKey:"userId"});
      User.hasMany(item, {foreignKey:"userId"});

    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    permisstions: DataTypes.ENUM("Admin","Normal")
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};